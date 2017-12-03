import React, { Component } from 'react';
import Poems from './Poems'
import Logo from './Logo';
import BaironPanel from './BaironPanel';

import './style/App.css';

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
      rhyme: {}
    };
  };

  onPoemTitleChange = (newTitle, index) => {
    var poems = this.state.poems;
    poems[index].title = newTitle;
    this.setState({poems: poems});
  };

  onPoemTextChange = (newText, index) => {
    var poems = this.state.poems;
    poems[index].text = newText;
    this.setState({poems: poems});
    this.updateBairon();
    this.updateThesaurus();
    this.updateRhyme();
  };

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

  updateBairon = () => {
    console.log('updating bairon')
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
    .then(response => {
      return response.json()
    }).then(responseJSON => {
      this.setState({bairon: responseJSON})
    })
    .catch(error => {console.log(error)});
  };

  updateThesaurus = () => {
    console.log('updating thesaurus')
    fetch('http://127.0.0.1:5000/thesaurus', {  
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        poem: this.state.poems[this.state.currentPoem].text
      })
    })
    .then(response => {
      return response.json()
    }).then(responseJSON => {
      var newThesaurus = this.joinObjects(this.state.thesaurus, responseJSON);
      this.setState({thesaurus: newThesaurus});
    })
    .catch(error => {console.log(error)});
  };

  updateRhyme = () => {
    console.log('updating rhyme')
    fetch('http://127.0.0.1:5000/rhyme', {  
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        poem: this.state.poems[this.state.currentPoem].text
      })
    })
    .then(response => {
      return response.json()
    }).then(responseJSON => {
      var newRhyme = this.joinObjects(this.state.rhyme, responseJSON);
      this.setState({rhyme: newRhyme});
    })
    .catch(error => {console.log(error)});
  };

  joinObjects = (a, b) => {
    var result = {};
    Object.keys(a).forEach((key) => result[key] = a[key]);
    Object.keys(b).forEach((key) => result[key] = b[key]);
    return result
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
            addPoem={this.addPoem}
            deletePoem={this.deletePoem}/>
        </div>
        <div className="App-right">
          <Logo/>
          <BaironPanel
            seed={this.state.poems[this.state.currentPoem] ? this.state.poems[this.state.currentPoem]['text'] : ''}
            updateBairon={this.updateBairon}
            bairon={this.state.bairon}
            rhyme={this.state.rhyme}
            thesaurus={this.state.thesaurus}
          />
        </div>
      </div>
    );
  }
}

export default App;
