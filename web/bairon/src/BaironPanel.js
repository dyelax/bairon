import React, { Component } from 'react';
import PanelWidget from './PanelWidget';

class BaironPanel extends Component {

  render() {
    var rhymeKeyValues = {
      "night": ["height", "might", "quite"],
      "day": ["bay", "sway", "pray"]
    }

    var thesaurusKeyValues = {
      "rage": ["seethe", "rampage", "roar"],
      "gentle": ["calm", "delicate", "mellow"]
    }

    return (
      <div className="BaironPanel">
        <PanelWidget 
          title="bairon's ideas..." 
          text={this.props.bairon}
          actionFunction={this.props.updateBairon}
          actionText={'inspire me, bairon'}/>
        <PanelWidget 
          title="thesaurus" 
          keyValuesData={thesaurusKeyValues}
          searchLink="http://www.thesaurus.com/"/>
        <PanelWidget 
          title="rhyme dictionary" 
          keyValuesData={rhymeKeyValues}
          searchLink="http://www.rhymezone.com/"/>
      </div>
    );
  }
}

export default BaironPanel;