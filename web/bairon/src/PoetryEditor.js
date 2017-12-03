import React, { Component } from 'react';
import PoetryInput from './PoetryInput';
import InlineEdit from 'react-edit-inline';

class PoetryEditor extends Component {
  onTitleChange = (result) => {
    if (this.props.onTitleChange) {
      this.props.onTitleChange(result.message, this.props.index);
    }
  };

  onTextChange = a => {
    if (this.props.onTextChange) {
      this.props.onTextChange(a.target.value, this.props.index);
    }
  };

  render() {
    return (
      <div className="PoetryEditor">
        <div className="PoemTitle">
          <InlineEdit
            className="inline-edit"
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
          change={this.onTextChange}
          onSelectionChange={this.props.onSelectionChange}/>
      </div>
    );
  }
}

export default PoetryEditor;