import tensorflow as tf
import numpy as np
from grpc.beta import implementations
from tensorflow_serving.apis import predict_pb2
from tensorflow_serving.apis import prediction_service_pb2

from utils.data_processing import preprocess, postprocess, get_random_word, process_suggestion

def generate_poem_suggestion(primer, vocab):
    """
    Generate a poem suggestion conditioned on primer from the TensorFlow serving model.

    :param primer: The priming input text (what the user has written so far.
    :param vocab: The vocabulary.

    :return: The text of the suggested poetry.
    """
    if primer is None:
        primer = get_random_word(vocab)

    inputs = preprocess(primer, vocab)

    # create connection
    host, port = 'hostport'.split(':')
    channel = implementations.insecure_channel(host, int(port))
    stub = prediction_service_pb2.beta_create_PredictionService_stub(channel)

    # initialize a request
    request = predict_pb2.PredictRequest()
    request.model_spec.name = 'model'
    request.model_spec.signature_name = 'prediction'

    request.inputs['inputs'].CopyFrom(tf.contrib.util.make_tensor_proto(inputs, dtype='int32'))
    result = stub.Predict(request)

    outputs = np.array(result.outputs['outputs'].float_val)

    # Postprocess outputs to get generated text
    gen_text = postprocess(outputs, vocab)

    # Process text to display in the UI
    bairon_text = process_suggestion(gen_text, primer)

    return bairon_text