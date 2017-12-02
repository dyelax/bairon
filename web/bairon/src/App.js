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
