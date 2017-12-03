// WE ARE THROWING THIS COMPONENT AWAY
// using an imported component instead :)
import React, { Component } from 'react';

class EditableTitle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false,
      title: this.props.title
    };
  }

  onClick = (e) => {
    this.setState({editing: true});
  }

  render() {
    if (this.state.editing) {
      return <textarea defaultValue={this.props.title || 'untitled'}></textarea>;
    }
    return (
      <h1 onClick={this.onClick} className="title">
        {this.props.title || 'untitled'}
      </h1>
    );
  }
}

export default EditableTitle;