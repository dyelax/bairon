import re
import numpy as np
import os
import random
from string import punctuation
from glob import glob
from collections import Counter

UNK_TOKEN = '*UNK*'

def unkify(string, vocab):
    """
    Translates all words in string that do not appear in vocab to '*UNK*'.

    @param string: The string to be unkified.
    @param vocab: The vocabulary with respect to which we unkify.

    @return: The string, with all words unknown to the vocab translated to '*UNK*'.
    """
    words = string.split(' ')
    for i, word in enumerate(words):
        if word not in vocab:
            words[i] = UNK_TOKEN

    return ' '.join(words)


def clean_string(txt):
    """
    Cleans unwanted characters and words from txt.

    @param txt: The string to be cleaned.

    @return: The cleaned string.
    """
    clean_txt = txt
    clean_txt = clean_txt.lower()  # lowercase

    # clean_words = []
    # for word in clean_txt.split():
    #     # clean words with quotation marks on only one side
    #     if word[0] == '"' and word[-1] != '"':
    #         word = word[1:]
    #     elif word[-1] == '"' and word[0] != '"':
    #         word = word[-1]
    #
    #     # clean words with parenthases on only one side
    #     if word[0] == '(' and word[-1] != ')':
    #         word = word[1:]
    #     elif word[-1] == ')' and word[0] != '(':
    #         word = word[:-1]
    #
    #     clean_words.append(word)
    # clean_txt = ' '.join(clean_words)

    # Add spaces around newlines
    clean_txt = clean_txt.replace('\n', ' \n ')

    # Replace multiple spaces with a single whitespace
    clean_txt = re.sub(' +', ' ', clean_txt)

    # Remove punctuation
    clean_txt = clean_txt.translate(None, punctuation)

    return clean_txt


def postprocess(txt):
    """
    Postprocess text generated by the model.

    :param txt:

    :return: The postprocessed text.
    """
    processed_txt = txt

    # Remove spaces after newlines
    processed_txt = processed_txt.replace('\n ', '\n')

    return processed_txt


class DataReader:
    def __init__(self, dir):
        self.dir = dir
        self.poems = []
        self.lyric_indices = []
        self.vocab_lookup = {}
        self.vocab = []

    def load_poems(self):
        """
        Read poems from file into self.poems - a 2D list of dimensions [poems, poem_words].
        """
        npy_paths = glob(os.path.join(self.dir, '*.txt'))
        for path in npy_paths:
            with open(path, 'r') as poem:
                words = clean_string(poem.read()).split(' ')
                self.poems.append(words)

    def get_vocab(self):
        """
        @return: An array of unique words (tokens) with the bottom THRESHOLD_COUNT least
                 frequent words converted to '*UNK*'
        """
        if self.vocab:
            return self.vocab

        # Load the lyric data if it hasn't been loaded already
        if len(self.poems) == 0:
            self.load_poems()

        # Collapses the 2D array to a 1D array of words
        all_words = sorted(reduce(lambda a,b: a + b, self.poems))

        # convert THRESHOLD_COUNT least frequent words to '*UNK*'
        THRESHOLD_COUNT = 100
        least_referenced = Counter(all_words).most_common()[:-(THRESHOLD_COUNT + 1):-1]
        least_referenced = [tup[0] for tup in least_referenced]  # grab word from (word, count) tuple
        # print least_referenced

        self.poems = [map(lambda word: UNK_TOKEN if word in least_referenced else word, poem)
                       for poem in self.poems]
        # reset all_words to include UNKs
        all_words = reduce(lambda a, b: a + b, self.poems)

        # get a sorted list of unique word tokens
        tokens = sorted(list(set(all_words)))

        # creates a map from word to index
        self.vocab_lookup = dict((word, i) for i, word in enumerate(tokens))
        # Converts words in self.lyrics to the appropriate indices.
        self.poem_indices = [map(lambda word: self.vocab_lookup[word], poem) for poem in self.poems]

        print 'Vocab size: ', len(tokens)

        self.vocab = tokens

        return self.vocab

    def get_train_batch(self, batch_size, seq_len):
        """
        Gets a batch of sequences for training.

        @param batch_size: The number of sequences in the batch.
        @param seq_len: The number of words in a sequence.

        @return: A tuple of arrays of shape [batch_size, seq_len].
        """
        inputs = np.empty([batch_size, seq_len], dtype=int)
        targets = np.empty([batch_size, seq_len], dtype=int)

        for i in xrange(batch_size):
            input, target = self.get_seq(seq_len)
            inputs[i] = input
            targets[i] = target

        return inputs, targets

    def get_seq(self, seq_len):
        """
        Gets a single pair of sequences (input, target) from a random poem.

        @param seq_len: The number of words in a sequence.

        @return: A tuple of sequences, (input, target) offset from each other by one word.
        """
        # Pick a random poem. Must be longer than seq_len
        for i in xrange(1000):  # cap at 1000 tries
            poem = random.choice(self.poem_indices)
            if len(poem) > seq_len: break

        # Take a sequence of (seq_len) from the poem
        i = random.randint(0, len(poem) - (seq_len + 1))
        inp = np.array(poem[i:i+seq_len], dtype=int)
        target = np.array(poem[i+1:i+seq_len+1], dtype=int)
        return inp, target