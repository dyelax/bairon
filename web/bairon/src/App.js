import React, { Component } from 'react';
import PoetryEditor from './PoetryEditor';
import './style/App.css';
import logo from './img/logo.svg';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-left">
          <PoetryEditor/>
        </div>
        <div className="App-right">
        </div>
      </div>
    );
  }
}

export default App;
