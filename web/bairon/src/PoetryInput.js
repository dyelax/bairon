import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class PoetryInput extends Component {

  onMouseUp = (e) => {
    let textVal = this.refs.poetryTextarea;
    if (textVal.selectionStart && textVal.selectionEnd) {
      let cursorStart = textVal.selectionStart;
      let cursorEnd = textVal.selectionEnd;
      if (this.props.text) {
        let selection = this.props.text.substring(cursorStart,cursorEnd);
        if (this.props.onSelectionChange) {
          this.props.onSelectionChange(selection);
        }
      }
    }
  };

  componentDidMount() {
    ReactDOM.findDOMNode(this.refs.poetryTextarea).focus()
  };

  componentDidUpdate() {
    ReactDOM.findDOMNode(this.refs.poetryTextarea).focus()
  };

  render() {
    return (
      <textarea 
        className="PoetryInput"
        value={this.props.text}
        ref="poetryTextarea"
        onChange={this.props.change}
        onMouseUp={this.onMouseUp}>
      </textarea>
    );
  }
}

export default PoetryInput;