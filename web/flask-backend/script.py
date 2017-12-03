import re, string
import random

def thesaurus(poem):
  poem = poem.split()
  pattern = re.compile('[\W_]+')
  for word in poem:
    word = pattern.sub('', word)
  print(poem)
  length = len(poem)

  # ahaha
  while (1):
    i = random.randint(0, length - 1)
    if len(words[i]) > 3:
      results = thesaurus_word(words[i])
      if len(results) > 2:
        return json.dumps(results)

if __name__ == "__main__":
  print(thesaurus('Let us go then, you and I, when the evening is spread out agains the sky, like a patient etherized upon a table.'))