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
      currentPoem: 0
    };
  };

  componentDidMount() {
    console.log('component mounted.')
    var poem = "Let us go, then, you and I / When the evening is spread out against the sky / Like a patient etherized upon a table."

    fetch('http://127.0.0.1:5000/everything', {  
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        poem: poem
      })
    })
    .then(response => {
      console.log(response.json())
    })
    .then(responseJson => {console.log(responseJson)})
    .catch(error => {console.log(error)});
  }

  onPoemTitleChange = (newTitle, index) => {
    var poems = this.state.poems;
    poems[index].title = newTitle;
    this.setState({poems: poems});
  };

  onPoemTextChange = (newText, index) => {
    var poems = this.state.poems;
    poems[index].text = newText;
    this.setState({poems: poems});
  };

  addPoem = () => {
    var poems = this.state.poems;
    poems.push({title: 'untitled', text: ''});
    this.setState({poems: poems, currentPoem: poems.length-1})
  };

  deletePoem = (index) => {
    var poems = this.state.poems;
    poems.splice(index, 1);
    this.setState({poems: poems});
  };

  selectPoem = (index) => {
    this.setState({currentPoem: index});
  }

  render() {
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
            seed={this.state.poems[this.state.currentPoem]['text']}
          />
        </div>
      </div>
    );
  }
}

export default App;
