import React, { Component } from 'react';
import PanelWidget from './PanelWidget';

class BaironPanel extends Component {
  actionFunction = () => {
    console.log('hello there');
  }

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
          text="Grave men, near death, who see with blinding sight / Blind eyes could blaze like meteors and be gay, / Rage, rage against the dying of the light."
          actionFunction={this.actionFunction}
          actionText="generate more"/>
        <PanelWidget 
          title="thesaurus" 
          keyValuesData={thesaurusKeyValues}
          searchLink="http://www.thesaurus.com/"/>
      </div>
    );
  }
}

export default BaironPanel;