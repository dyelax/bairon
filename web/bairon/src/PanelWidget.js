import React, { Component } from 'react';
import KeyValuesLines from './KeyValuesLines';

class PanelWidget extends Component {
  render() {
    return (
      <div className="PanelWidget">
        <h1 className="title widget-title">
          {this.props.title}
        </h1>

        <p className="widget-body">
          {this.props.text}
        </p>

        {this.props.actionFunction && this.props.actionText &&
          <button onClick={this.props.actionFunction}>{this.props.actionText}</button>
        }

        {this.props.keyValuesData && 
          <KeyValuesLines data={this.props.keyValuesData}/>
        }

        {this.props.searchLink && 
          <a target="_blank" href={this.props.searchLink}>search...</a>
        }
      </div>
    );
  }
}

export default PanelWidget;