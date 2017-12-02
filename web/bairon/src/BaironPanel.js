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

    return (
      <div className="BaironPanel">
        <PanelWidget 
          title="bairon's ideas..." 
          text="Grave men, near death, who see with blinding sight\nBlind eyes could blaze like meteors and be gay,
Rage, rage against the dying of the light."
          actionFunction={this.actionFunction}
          actionText="generate more"/>
        <PanelWidget title="thesaurus" searchLink="http://www.thesaurus.com/"/>
        <PanelWidget title="rhyme dictionary" keyValuesData={rhymeKeyValues}/>
      </div>
    );
  }
}

export default BaironPanel;