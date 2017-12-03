import React, { Component } from 'react';
import Poems from './Poems'
import Logo from './Logo';
import BaironPanel from './BaironPanel';

import './style/App.css';
import './style/dark.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      poems: [
        {title: 'untitled', text: ''},
      ],
      currentPoem: 0,
      bairon: 'Start typing to seed the generator!',
      thesaurus: {},
      rhyme: {},
      selection: ''
    };
  };

  onPoemTitleChange = (newTitle, index) => {
    var poems = this.state.poems;
    poems[index].title = newTitle;
    this.setState({poems: poems});
  };

  onPoemTextChange = (newText, index) => {
    var poems = this.state.poems;
    var oldText = poems[index].text;
    poems[index].text = newText;
    this.setState({poems: poems});

    // If the number of spaces changes, a word has been completed or removed, so we should update
    // bairon's suggestion
    var oldSpaces = (oldText.match(/\s/g) || []).length;
    var newSpaces = (newText.match(/\s/g) || []).length;
    if (oldSpaces !== newSpaces) {
        this.updateBairon();
    }

    // this.updateThesaurus();
    // this.updateRhyme();
  };

  onSelectionChange = selection => {
    selection = selection.split(' ')[0];
    this.setState({selection: selection});
    if (selection !== '') {
      this.updateRhyme(selection);
      this.updateThesaurus(selection);
    }
  }

  addPoem = () => {
    var poems = this.state.poems;
    poems.push({title: 'untitled', text: ''});
    this.setState({poems: poems, currentPoem: poems.length-1})
  };

  deletePoem = (index) => {
    // console.log('deleting a poem')
    
    var poems = this.state.poems;
    var currentPoem = this.state.currentPoem;

    if (poems.length === 1) {
      poems[0].title = 'untitled';
      poems[0].text = ''
      this.setState({poems: poems});
    } else {
      if (index === currentPoem && index === poems.length - 1) {
        // console.log('this was the state of currentPoem: ' + currentPoem);
        this.setState({currentPoem: currentPoem - 1});
        poems.splice(index, 1);
        this.setState({currentPoem: currentPoem - 1, poems: poems}, function () {
          // console.log('hello, we are in the callback');
          // console.log(this.state.currentPoem);
        });
      } else {
        poems.splice(index, 1);
        this.setState({poems: poems});
      }
    }
  };

  selectPoem = (index) => {
    this.setState({currentPoem: index});
  };


  sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  updateBairon = () => {
    this.setState({baironLoading: true});
    let then = new Date();

    fetch('http://127.0.0.1:5000/bairon', {  
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        poem: this.state.poems[this.state.currentPoem].text
      })
    })
    .then(async response => {
      let now = new Date();
      if (now - then < 1000) {
        await this.sleep(1000);
      }
      return response.json()
    }).then(responseJSON => {
      this.setState({
        bairon: responseJSON,
        baironLoading: false
      })
    })
    .catch(error => {
      this.setState({
        bairon: 'Oops, there was a problem accessing the service. Try again?',
        baironLoading: false
      });
    });
  };

  updateThesaurus = (word) => {
    this.setState({thesaurusLoading: true});
    let then = new Date();
    let promise;

    if (!word) {
      return;
    }

    fetch('http://127.0.0.1:5000/thesaurus/' + word, {  
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then(async response => {
      let now = new Date();
      if (now - then < 1000) {
        await this.sleep(1000);
      }
      return response.json()
    }).then(responseJSON => {
      this.setState({
        thesaurus: responseJSON,
        thesaurusLoading: false,
        thesaurusText: ''
      });
    })
    .catch(error => {
      this.setState({
        thesaurusText: 'Oops, there was a problem accessing the service. Try again?',
        thesaurusLoading: false
      });
    });


    // else {
    //   promise = fetch('http://127.0.0.1:5000/thesaurus', {  
    //     method: 'POST',
    //     headers: {
    //       'Accept': 'application/json',
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       poem: this.state.poems[this.state.currentPoem].text
    //     })
    //   });
    // }
  };

  updateRhyme = (word) => {
    this.setState({rhymeLoading: true});
    let then = new Date();
    let promise;

    if (!word) {
      return;
    }

    fetch('http://127.0.0.1:5000/rhyme/' + word, {  
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then(async response => {
      let now = new Date();
      if (now - then > 1000) {
        await this.sleep(1000);
      }
      return response.json()
    }).then(responseJSON => {
      console.log(responseJSON);
      this.setState({
        rhyme: responseJSON,
        rhymeLoading: false,
        rhymeText: ''
      });
    })
    .catch(error => {
      if (error) {
        this.setState({
          rhymeText: 'Oops, there was a problem accessing the service. Try again?',
          rhymeLoading: false
        });
      }
    });
  };

  render() {
    // console.log('rendering');
    // console.log(this.state.currentPoem);
    return (
      <div className="App">
        <div className="App-left">
          <Poems 
            poems={this.state.poems}
            currentPoem={this.state.currentPoem}
            onSelectPoem={this.selectPoem}
            onPoemTitleChange={this.onPoemTitleChange}
            onPoemTextChange={this.onPoemTextChange}
            onSelectionChange={this.onSelectionChange}
            addPoem={this.addPoem}
            deletePoem={this.deletePoem}/>
        </div>
        <div className="App-right">
          <Logo/>
          <BaironPanel
            seed={this.state.poems[this.state.currentPoem] ? this.state.poems[this.state.currentPoem]['text'] : ''}
            updateBairon={this.updateBairon}
            bairon={this.state.bairon}
            baironLoading={this.state.baironLoading}
            rhyme={this.state.rhyme}
            rhymeLoading={this.state.rhymeLoading}
            rhymeText={this.state.rhymeText}
            thesaurus={this.state.thesaurus}
            thesaurusLoading={this.state.thesaurusLoading}
            thesaurusText={this.state.thesaurusText}
          />
        </div>
      </div>
    );
  }
}

export default App;
