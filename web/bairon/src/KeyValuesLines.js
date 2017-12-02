import React, { Component } from 'react';

class KeyValuesLines extends Component {
  render() {
    var keys = Object.keys(this.props.data);
    var lines = keys.map(key => {
      return <p key={key} className="widget-body tight">{key} <span className="gray">
        {this.props.data[key].map(val => {return val + ' ';})}
      </span></p>;
    });
    return <div>{lines}</div>;
  }
}

export default KeyValuesLines;
