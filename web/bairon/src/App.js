import React, { Component } from 'react';
import PoetryEditor from './PoetryEditor';
import Logo from './Logo';
import BaironPanel from './BaironPanel';
import './style/App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-left">
          <PoetryEditor/>
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
