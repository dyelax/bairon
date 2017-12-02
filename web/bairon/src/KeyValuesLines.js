import React, { Component } from 'react';

class KeyValuesLines extends Component {
  render() {
    console.log(this.props.data);
    console.log(Object.keys(this.props.data));
    console.log();

    return (
      <div>
      {Object.keys(this.props.data).map(
        (key) => (
          <p key={key}>
            {key + ' ' + 
              this.props.data[key].map(
                val => (val + ' ')
              )
            }
          </p>
        )
      )}
      </div>
    );
  }
}

export default KeyValuesLines;
