import React, { Component } from 'react';

class PoetryInput extends Component {
  render() {
    return (
      <textarea 
        className="PoetryInput"
        value={this.props.text}
        onChange={this.props.change}>
      </textarea>
    );
  }
}

export default PoetryInput;