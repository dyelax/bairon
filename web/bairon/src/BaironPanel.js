import React, { Component } from 'react';
import PanelWidget from './PanelWidget';

class BaironPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      baironIdeas: 'Start typing to seed the generator!',
    }
  };

  generateBaironIdeas = () => {
    if (this.props.seed) {
      // return bairon ideas generated based on the seed
      this.setState({baironIdeas: 'Do not go gentle into that good night'});
    } else {
      // return bairon ideas generated randomly
      this.setState({baironIdeas: 'Rage, rage against the dying of the light'});
    }
  }

  // getBaironActionText = () => {
  //   if (this.props.seed) {
  //     return 'generate new';
  //   }
  //   return 'bairon, inspire me';
  // };

  // getBaironIdeas = () => {
  //   if (this.props.seed) {
  //     return 'Grave men, near death, who see with blinding sight...';
  //   }
  //   return 'Start typing to seed the generator!'
  // };

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
          text={this.state.baironIdeas}
          actionFunction={this.generateBaironIdeas}
          actionText={this.props.seed ? 'generate new' : 'bairon, inspire me'}/>
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