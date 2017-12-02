import React, { Component } from 'react';
import PanelWidget from './PanelWidget';

class BaironPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      generateRandomly: false
    }
  };

  generateIdeas = () => {
    if (this.props.seed) {
      return 'Do not go gentle into that good night';
    } else {
      return 'Rage, rage against the dying of the light';
    }
  }

  setGenerateRandomly = () => {
    this.setState({generateRandomly: true});
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
          text={this.props.seed || this.state.generateRandomly ? this.generateIdeas() : 'Start typing to seed the generator!'}
          actionFunction={this.props.seed || this.state.generateRandomly ? this.generateIdeas : this.setGenerateRandomly}
          actionText={this.props.seed || this.state.generateRandomly ? 'generate new' : 'bairon, inspire me'}/>
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