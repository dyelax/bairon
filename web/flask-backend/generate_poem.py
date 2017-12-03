from utils.data_processing import preprocess, postprocess, get_random_word

def generate_poem_suggestion(primer, vocab):
    """
    Generate a poem suggestion conditioned on primer from the TensorFlow serving model.

    :param primer: The priming input text (what the user has written so far.
    :param vocab: The vocabulary.

    :return: The text of the suggested poetry.
    """
    if primer is None:
        primer = get_random_word(vocab)

    input = preprocess(primer, vocab)
    # input = primer

    output = postprocess(input)
    return output