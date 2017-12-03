import React, { Component } from 'react';
import PanelWidget from './PanelWidget';

class BaironPanel extends Component {

  render() {
    return (
      <div className="BaironPanel">
        <PanelWidget 
          title="bairon's ideas..." 
          text={this.props.bairon}
          actionFunction={this.props.updateBairon}
          actionText={'inspire me, bairon'}/>
        <PanelWidget 
          title="thesaurus" 
          keyValuesData={this.props.thesaurus}
          searchLink="http://www.thesaurus.com/"/>
        <PanelWidget 
          title="rhyme dictionary" 
          keyValuesData={this.props.rhyme}
          searchLink="http://www.rhymezone.com/"/>
      </div>
    );
  }
}

export default BaironPanel;