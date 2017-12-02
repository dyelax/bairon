from utils.cli import parse_args


def train(args):
    pass


def generate(primer):
    pass


if __name__ == '__main__':
    args = parse_args()

    if args.inference:
        generate(args.primer)
    else:
        train(args)