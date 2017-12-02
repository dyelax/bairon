import os
import argparse

from misc import date_str, get_dir

def parse_args():
    parser = argparse.ArgumentParser()

    # Paths
    parser.add_argument('--train_dir',
                        help='Directory of train data',
                        default='./data/poetryDB/txt/')
    # parser.add_argument('--test_dir',
    #                     help='Directory of test data',
    #                     default='./data/bitmoji/test')
    parser.add_argument('--save_dir',
                        help='Directory to save logs and model checkpoints',
                        default=os.path.join('.', 'save', date_str()))
    parser.add_argument('--load_path',
                        help='Path of the model checkpoint to load')
    parser.add_argument('--data_reader_path',
                        help='Path to save/load the DataReader object',
                        default=os.path.join('.', 'save', 'reader.pkl'))

    # Model Architecture
    parser.add_argument('--cell_size',
                        help='Minibatch size',
                        default=256,
                        type=int)
    parser.add_argument('--num_layers',
                        help='Minibatch size',
                        default=3,
                        type=int)

    # Hyperparams
    parser.add_argument('--batch_size',
                        help='Minibatch size',
                        default=128,
                        type=int)
    parser.add_argument('--seq_len',
                        help='Sequence length (the number of tokens in each element of the batch)',
                        default=20,
                        type=int)
    parser.add_argument('--lr',
                        help='Learning rate',
                        default=3e-5,
                        type=float)
    parser.add_argument('--keep_prob',
                        help='The keep probability for dropout (always 1 for testing)',
                        default=0.5,
                        type=float)

    # Training
    parser.add_argument('--max_steps',
                        help='Max number of steps to train',
                        default=30000,
                        type=int)
    parser.add_argument('--summary_freq',
                        help='Frequency (in steps) with which to write tensorboard summaries',
                        default=100,
                        type=int)
    parser.add_argument('--model_save_freq',
                        help='Frequency (in steps) with which to save the model',
                        default=1000,
                        type=int)
    parser.add_argument('--inference_freq',
                        help='Frequency (in steps) with which to perform inference',
                        default=100,
                        type=int)

    # Inference
    parser.add_argument('--inference',
                        help="Use the model to generate new text.",
                        action='store_true')
    parser.add_argument('--max',
                        help="Use argmax to choose the next word, rather than sampling.",
                        action='store_true')
    parser.add_argument('--primer',
                        help="The priming text to use for inference. Random if not supplied",
                        default=None)


    # System
    parser.add_argument('--gpu',
                        help='Comma separated list of GPU(s) to use.')

    args = parser.parse_args()

    if args.gpu:
        os.environ['CUDA_VISIBLE_DEVICES'] = args.gpu

    get_dir(args.save_dir)

    return args