import tensorflow as tf

class WordModel:
    def __init__(self, args):
        self.args = args
        self._build_graph()

    def _build_graph(self):
        if test:
            self.batch_size = 1
            self.seq_len = 1

        ##
        # Data
        ##

        # inputs and targets are 2D tensors of shape (batch_size, seq_len)
        self.inputs = tf.placeholder(tf.int32, [None, None])
        self.targets = tf.placeholder(tf.int32, [None, None])
        self.initial_state = tf.placeholder(tf.float32, [None, self.args.cell_size])

        ##
        # Variables
        ##
        with tf.variable_scope('rnn_vars'):
            # Fully connected layer from the output of the GRU
            initializer = tf.contrib.layers.xavier_initializer()
            self.ws = tf.get_variable(
                'ws', (self.args.cell_size, self.vocab_size), initializer)
            self.bs = tf.get_variable(
                'bs', (self.vocab_size,), initializer)

            with tf.device('/cpu:0'): # put on CPU to parallelize for faster training/
                self.embeddings = tf.get_variable(
                    'embeddings', [self.vocab_size, self.args.cell_size], initializer)

                # get embeddings for all input words
                input_embeddings = tf.nn.embedding_lookup(self.embeddings, self.inputs)
                # The split splits this tensor into a seq_len long list of 3D tensors of shape
                # [batch_size, 1, rnn_size]. The squeeze removes the 1 dimension from the 1st axis
                # of each tensor
                inputs = tf.split(1, self.seq_len, input_embeddings)
                inputs = [tf.squeeze(input_, [1]) for input_ in inputs]


                # inputs_split looks like this:
                # [
                #   tensor_<0>([
                #       [batchElt<0>_wordEmbedding<0>],
                #       ...,
                #       [batchElt<batch_size - 1>_wordEmbedding<0>]
                #   ]),
                #   ...,
                #   tensor_<seq_len - 1>([
                #       [batchElt<0>_wordEmbedding<seq_len - 1>],
                #       ...,
                #       [batchElt<batch_size - 1>_wordEmbedding<seq_len - 1>]
                #   ])
                # ]


        ##
        # LSTM Cells
        ##


        gru_cell = tf.nn.rnn_cell.GRUCell(self.args.cell_size)
        multi_cell = tf.nn.rnn_cell.MultiRNNCell([gru_cell] * self.args.num_layers)
        gru_outputs, state = tf.nn.dynamic_rnn(multi_cell,
                                           inputs,
                                           initial_state=self.initial_state)

        # gru_outputs looks like this:
        # [
        #   tensor_<0>([
        #       [batchElt<0>_outputEmbedding<0>],
        #       ...,
        #       [batchElt<batch_size - 1>_outputEmbedding<0>]
        #   ]),
        #   ...,
        #   tensor_<seq_len - 1>([
        #       [batchElt<0>_outputEmbedding<seq_len - 1>],
        #       ...,
        #       [batchElt<batch_size - 1>_outputEmbedding<seq_len - 1>]
        #   ])
        # ]

        # output looks like this:
        # tensor([
        #     [batchElt<0>_outputEmbedding<0>],
        #     ...,
        #     [batchElt<0>_outputEmbedding<seq_len - 1>],
        #     [batchElt<1>_outputEmbedding<0>],
        #     ...,
        #     [batchElt<1>_outputEmbedding<seq_len - 1>],
        #     ...
        #     [batchElt<batch_size - 1>_outputEmbedding<0>],
        #     ...,
        #     [batchElt<batch_size - 1>_outputEmbedding<seq_len - 1>]
        # ])

        logits = tf.matmul(gru_outputs, self.ws) + self.bs
        self.probs = tf.nn.softmax(logits)

        ##
        # Train
        ##

        self.loss = tf.reduce_mean(tf.nn.softmax_cross_entropy_with_logits(
            logits=logits, labels=self.targets)) / self.args.seq_len

        self.global_step = tf.Variable(0, trainable=False, name='global_step')
        self.optimizer = tf.train.AdamOptimizer(learning_rate=self.args.lr,
                                                name='optimizer')
        self.train_op = self.optimizer.minimize(self.loss,
                                                global_step=self.global_step,
                                                name='train_op')

    def generate(self, primer):
        """
        Generate a sequence of words given priming text.

        :param primer: An initial string of text on which to condition the
                       generated sequence.

        :return: A sequence of generated text.
        """
        pass
