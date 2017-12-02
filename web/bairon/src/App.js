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
        {title: 'untitled', text: 'bleooap bloop'},
        {title: 'Do not go gentle into that good night', text: 'Rage, rage against the dying of the light'}
      ]
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

  render() {
    return (
      <div className="App">
        <div className="App-left">
          <Poems 
            poems={this.state.poems}
            onPoemTitleChange={this.onPoemTitleChange}
            onPoemTextChange={this.onPoemTextChange}/>
        </div>
        <div className="App-right">
          <Logo/>
          <BaironPanel/>
        </div>
      </div>
    );
  }
}

export default App;
