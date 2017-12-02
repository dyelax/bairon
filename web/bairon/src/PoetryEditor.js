import React, { Component } from 'react';
import PoetryInput from './PoetryInput';
import InlineEdit from 'react-edit-inline';

class PoetryEditor extends Component {
  render() {
    return (
      <div className="PoetryEditor">
        <div className="PoemTitle">
          <InlineEdit
            validate={this.customValidateText}
            activeClassName="editing"
            text={"untitled"}
            paramName="message"
            change={this.dataChanged}
            style={{
              fontFamily: 'Roboto',
              fontStyle: 'normal',
              fontWeight: 'bold',
              lineHeight: 'normal',
              fontSize: 36,
              color: '#5797C3',
            }}
          />
        </div>
        <PoetryInput/>
      </div>
    );
  }
}

export default PoetryEditor;