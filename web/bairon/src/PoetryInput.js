import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class PoetryInput extends Component {

  componentDidMount() {
    ReactDOM.findDOMNode(this.refs.poetryTextarea).focus()
  }

  componentDidUpdate() {
    ReactDOM.findDOMNode(this.refs.poetryTextarea).focus()
  }

  render() {
    return (
      <textarea 
        className="PoetryInput"
        value={this.props.text}
        ref="poetryTextarea"
        onChange={this.props.change}>
      </textarea>
    );
  }
}

export default PoetryInput;