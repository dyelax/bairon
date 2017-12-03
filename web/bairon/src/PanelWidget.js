import React, { Component } from 'react';
import KeyValuesLines from './KeyValuesLines';
import LoadingWidget from './LoadingWidget';

class PanelWidget extends Component {
  render() {
    return (
      <div className="PanelWidget">
        <h1 className="title widget-title">
          {this.props.title}
        </h1>

        {this.props.loading && <LoadingWidget/>}

        {!this.props.loading && <p className="widget-body">
          {this.props.text}
        </p>}

        {this.props.actionFunction && this.props.actionText &&
          <button 
            onClick={this.props.actionFunction}
            className="widget-button">
            {this.props.actionText}
          </button>
        }

        {this.props.keyValuesData && 
          <KeyValuesLines data={this.props.keyValuesData}/>
        }

        {this.props.searchLink && 
          <p className="widget-body">
            <a className="widget-search" 
              target="_blank" 
              href={this.props.searchLink}>
                search...
            </a>
          </p>
        }
      </div>
    );
  }
}

export default PanelWidget;