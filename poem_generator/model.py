import tensorflow as tf
import numpy as np
import os

from utils.data_processing import unkify, clean_string

class WordModel:
    def __init__(self, args, vocab):
        self.args = args
        self.vocab = vocab
        self.vocab_size = len(self.vocab)

        self.sess = tf.Session()

        self._build_graph()

        print 'Init variables...'
        self.sess.run(tf.global_variables_initializer())
        self.saver = tf.train.Saver(max_to_keep=None)

        # if load path specified, load a saved model
        if args.load_path is not None:
            self.saver.restore(self.sess, self.args.load_path)
            print 'Model restored from ' + self.args.load_path

    def _build_graph(self):
        with tf.name_scope('Word_Model'):
            with tf.name_scope('Inputs'):
                # inputs and targets are 2D tensors of shape (batch_size, seq_len)
                self.inputs = tf.placeholder(tf.int32, [None, None])
                self.targets = tf.placeholder(tf.int32, [None, None])
                batch_size = tf.shape(self.inputs)[0]

                # self.initial_state = tf.placeholder(tf.float32, [None, self.args.cell_size])
                self.keep_prob = tf.placeholder(tf.float32)

            with tf.variable_scope('Variables'):
                # Fully connected layer from the output of the GRU
                initializer = tf.contrib.layers.xavier_initializer()
                self.ws = tf.get_variable(
                    'ws', (self.args.cell_size, self.vocab_size), initializer=initializer)
                self.bs = tf.get_variable(
                    'bs', (self.vocab_size,), initializer=initializer)

                with tf.device('/cpu:0'): # put on CPU to parallelize for faster training/
                    self.embeddings = tf.get_variable(
                        'embeddings', [self.vocab_size, self.args.cell_size], initializer=initializer)

                    # get embeddings for all input words
                    input_embeddings = tf.nn.embedding_lookup(self.embeddings, self.inputs)

                self.cell = tf.nn.rnn_cell.GRUCell(self.args.cell_size)
                self.cell = tf.nn.rnn_cell.DropoutWrapper(self.cell,
                                                          input_keep_prob=self.keep_prob,
                                                          output_keep_prob=self.keep_prob,
                                                          state_keep_prob=self.keep_prob,)
                self.cell = tf.nn.rnn_cell.MultiRNNCell([self.cell] * self.args.num_layers)

                self.initial_state = self.cell.zero_state(batch_size, tf.float32)
                gru_outputs, self.gru_state = tf.nn.dynamic_rnn(cell=self.cell,
                                                                inputs=input_embeddings,
                                                                dtype=tf.float32,
                                                                initial_state=self.initial_state)

                gru_outputs_flat = tf.reshape(tf.concat(gru_outputs, axis=1),
                                              [-1, self.args.cell_size])

                logits = tf.matmul(gru_outputs_flat, self.ws) + self.bs
                self.probs = tf.squeeze(tf.nn.softmax(logits))

            with tf.name_scope('Optimization'):
                self.loss = tf.reduce_mean(tf.nn.sparse_softmax_cross_entropy_with_logits(
                    logits=logits, labels=tf.reshape(self.targets, [-1]))) / self.args.seq_len

                self.global_step = tf.Variable(0, trainable=False, name='global_step')

                self.lr = tf.train.exponential_decay(
                    self.args.lr, self.global_step, self.args.lr_decay_steps, self.args.lr_decay_rate)

                self.optimizer = tf.train.AdamOptimizer(learning_rate=self.args.lr,
                                                        name='optimizer')
                self.train_op = self.optimizer.minimize(self.loss,
                                                        global_step=self.global_step,
                                                        name='train_op')

    def generate(self, primer=None, max_words=100, save_path=None):
        """
        Generate a sequence of words given priming text.

        :param primer: An initial string of text on which to condition the
                       generated sequence.
        :param max_words: The maximum number of words to generate.

        :return: A sequence of generated text.
        """
        if primer is None:
            primer = np.random.choice(self.vocab)

        primer_clean = unkify(clean_string(primer), self.vocab)
        primer_is = [self.vocab.index(word) for word in primer_clean.split(' ')]

        # Initialize state with primer
        initial_state = self.sess.run(self.cell.zero_state(1, tf.float32))
        feed_dict = {self.inputs: np.array([primer_is]),
                     self.initial_state: initial_state,
                     self.keep_prob: 1}
        state = self.sess.run(self.gru_state, feed_dict=feed_dict)

        # Generate sequence
        gen_seq = primer
        last_word_i = primer_is[-1]
        for i in xrange(max_words):
            input = np.array([[last_word_i]])
            feed_dict = {self.inputs: input,
                         self.initial_state: state,
                         self.keep_prob: 1}
            probs, state = self.sess.run([self.probs, self.gru_state], feed_dict=feed_dict)

            # select index of new word via argmax or sample
            if self.args.max:
                gen_word_i = np.argmax(probs)
            else:
                gen_word_i = np.random.choice(np.arange(len(probs)), p=probs)

            # append new word to the generated sequence
            gen_word = self.vocab[gen_word_i]

            gen_seq += ' ' + gen_word
            last_word_i = gen_word_i

            # TODO: break on newline

        print gen_seq

        if save_path is not None:
            with open(save_path, 'w') as f:
                f.write(gen_seq)

    def train_step(self, inputs, targets):
        """
        Perform one training step on the model

        :param inputs: A batch of word sequences.
        :param targets: A batch of target word sequences (inputs shifted by one word).

        :return: The global step.
        """

        initial_state = self.sess.run(self.cell.zero_state(self.args.batch_size, tf.float32))
        feed_dict = {self.inputs: inputs,
                     self.targets: targets,
                     self.initial_state: initial_state,
                     self.keep_prob: self.args.keep_prob}
        global_step, loss, lr, _ = self.sess.run([self.global_step,
                                              self.loss,
                                              self.lr,
                                              self.train_op],
                                             feed_dict=feed_dict)

        print 'Step: %d | lr: %f | loss: %f' % (global_step, lr, loss)
        if (global_step - 1) % self.args.model_save_freq == 0:
            print 'Saving model...'
            self.saver.save(self.sess, os.path.join(self.args.save_dir, 'model'),
                            global_step=global_step)

        if (global_step - 1) % self.args.inference_freq == 0:
            self.generate(save_path=os.path.join(self.args.save_dir, str(global_step) + '.txt'))

        return global_step
