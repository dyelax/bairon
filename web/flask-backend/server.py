from flask import Flask, request
import re, string, json, requests, random
from flask_cors import CORS

app = Flask(__name__)
app.config.from_envvar('BAIRON_SETTINGS')
CORS(app)

oxford_app_id = 'f17ea4d6'
oxford_app_key = app.config['OXFORD_APP_KEY']
language = 'en'

@app.route('/everything', methods=['POST'])
def everything():
  results = {
    'bairon': '',
    'thesaurus': {},
    'rhyme': {}
  }

  poem = request.get_json()['poem']

  results['bairon'] = bairon(poem)
  results['thesaurus'] = thesaurus(poem)
  results['rhyme'] = rhyme(poem)

  return json.dumps(results)

@app.route('/bairon/<poem>', methods=['GET'])
def bairon(poem):
  if not poem:
    return "Not implemented yet! (random seed)"
  return "Not implemented yet! (seed provided)"

@app.route('/thesaurus/poem/<poem>', methods=['GET'])
def thesaurus(poem):
  poem = poem.split()
  pattern = re.compile('[\W_]+')
  for word in poem:
    word = pattern.sub('', word)
  print(poem)
  length = len(poem)

  tries = 0
  while (tries < length):
    i = random.randint(0, length - 1)
    if len(poem[i]) > 3:
      results = thesaurus_word(poem[i])
      if len(results) > 2:
        return json.dumps(results)
  return []

@app.route('/thesaurus/word/<word>', methods=['GET'])
def thesaurus_word(word):
  url = 'https://od-api.oxforddictionaries.com:443/api/v1/entries/en/' + \
    word.lower() + '/synonyms'
  r = requests.get(url, headers = {
    'app_id': oxford_app_id, 'app_key': oxford_app_key
  })

  if r.status_code == 404:
    return []

  # todo error check this
  # todo parts of speech
  synonyms = r.json()['results'][0]['lexicalEntries'][0]['entries'][0]['senses'][0]['synonyms'][:5]
  synonyms = list(map(lambda x: x['text'], synonyms))

  return json.dumps(synonyms)

@app.route('/rhyme/poem/<poem>', methods=['GET'])
def rhyme(poem):
  return 'Not implemented yet'

@app.route('/rhyme/word/<word>', methods=['GET'])
def rhyme_word(word):
  return 'Not implemented yet'
