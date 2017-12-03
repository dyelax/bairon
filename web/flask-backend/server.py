from flask import Flask, request
import re, string, json, requests, random
from flask_cors import CORS
from datamuse import datamuse

app = Flask(__name__)
app.config.from_envvar('BAIRON_SETTINGS')
CORS(app)

oxford_app_id = 'f17ea4d6'
oxford_app_key = app.config['OXFORD_APP_KEY']
language = 'en'
datamuse_api = datamuse.Datamuse()

@app.route('/bairon', methods=['POST'])
def bairon():
  body = request.get_json()
  if not body['poem'] or body['poem'] == '':
    return json.dumps("Not implemented yet! (random seed)")
  return json.dumps("Not implemented yet! (seed provided)")

@app.route('/thesaurus', methods=['POST'])
def thesaurus():
  poem = request.get_json()['poem']
  if not poem or poem == '':
    return "Please give us a poem"

  poem = split_poem_into_words(poem)
  length = len(poem)

  tries = 0
  while (tries < length):
    i = random.randint(0, length - 1)
    if len(poem[i]) > 3:
      words = thesaurus_helper(poem[i])
      if len(words) > 2:
        results = {}
        results[poem[i]] = words
        return json.dumps(results)
  return json.dumps({})

@app.route('/thesaurus/<word>', methods=['GET'])
def thesaurus_word(word):
  result = {}
  result[word] = thesaurus_helper(word)
  return json.dumps(result)

def thesaurus_helper(word):
  url = 'https://od-api.oxforddictionaries.com:443/api/v1/entries/en/' + \
    word.lower() + '/synonyms'
  r = requests.get(url, headers = {
    'app_id': oxford_app_id, 'app_key': oxford_app_key
  })

  if r.status_code == 404:
    return json.dumps({})

  # todo error check this
  # todo parts of speech
  synonyms = r.json()['results'][0]['lexicalEntries'][0]['entries'][0]['senses'][0]['synonyms'][:5]
  synonyms = list(map(lambda x: x['text'], synonyms))

  return synonyms

@app.route('/rhyme', methods=['POST'])
def rhyme():
  poem = request.get_json()['poem']
  if not poem  or poem == '':
    return "Please give us a poem"

  poem = split_poem_into_words(poem)
  length = len(poem)

  tries = 0
  while (tries < length):
    i = random.randint(0, length - 1)
    if len(poem[i]) > 3:
      words = rhyme_helper(poem[i])
      if len(words) > 2:
        results = {}
        results[poem[i]] = words
        return json.dumps(results)
  return json.dumps({})

@app.route('/rhyme/<word>', methods=['GET'])
def rhyme_word(word):
  result = {}
  result[word] = rhyme_helper(word)
  return json.dumps(result)

def rhyme_helper(word):
  rhymes = datamuse_api.words(rel_rhy=word, max=5)
  rhymes = list(map(lambda x: x['word'], rhymes))
  return rhymes

def split_poem_into_words(poem):
  poem = poem.split()
  pattern = re.compile('[\W_]+')
  for word in poem:
    word = pattern.sub('', word)
  return poem
