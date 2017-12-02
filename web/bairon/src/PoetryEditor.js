import React, { Component } from 'react';
import PoetryInput from './PoetryInput';
import InlineEdit from 'react-edit-inline';

class PoetryEditor extends Component {
  onTitleChange = (result) => {
    if (this.props.onTitleChange) {
      this.props.onTitleChange(result.message, this.props.index);
    }
  };

  onTextChange = (a, b, c) => {
    console.log(a);
    console.log(b);
    console.log(c);
    // if (this.props.onTextChange) {
    //   this.props.onTextChange(result.message, this.props.index);
    // }
  };

  render() {
    return (
      <div className="PoetryEditor">
        <div className="PoemTitle">
          <InlineEdit
            activeClassName="editing"
            text={this.props.title}
            paramName="message"
            change={this.onTitleChange}
            style={{
              fontFamily: 'Roboto',
              fontStyle: 'normal',
              fontWeight: 'bold',
              lineHeight: 'normal',
              fontSize: 36,
              color: '#5797C3',
            }}/>
        </div>
        <PoetryInput 
          text={this.props.text}
          change={this.onTextChange}/>
      </div>
    );
  }
}

export default PoetryEditor;