import React, { Component } from 'react';
import PoetryInput from './PoetryInput';

class PoetryEditor extends Component {
  render() {
    return (
      <div className="PoetryEditor">
        <h1 className="PoetryEditor-title">
          Do not go gentle into that good night
        </h1>
        <PoetryInput/>
        
      </div>
    );
  }
}

export default PoetryEditor;