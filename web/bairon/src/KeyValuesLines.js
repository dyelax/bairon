import React, { Component } from 'react';

class KeyValuesLines extends Component {
  render() {
    var keys = Object.keys(this.props.data);
    console.log(keys);
    var lines = keys.map(key => {
      return <p className="widget-body tight">{key} <span className="gray">
        {this.props.data[key].map(val => {return val + ' ';})}
      </span></p>;
    });


// {key + ' ' + 
//               this.props.data[key].map(
//                 val => (val + ' ')
//               )
//             }

    return <div>{lines}</div>;
  }
}

export default KeyValuesLines;
