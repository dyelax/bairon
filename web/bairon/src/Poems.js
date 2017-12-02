import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import PoetryEditor from './PoetryEditor';

class Poems extends Component {

  render() {
    var tabTitles = this.props.poems.map(poem => {
      return <Tab>{poem.title}</Tab>;
    });

    var tabContents = this.props.poems.map((poem, i) => {
      return <TabPanel>
        <PoetryEditor 
          index={i}
          title={poem.title}
          text={poem.text}
          onTitleChange={this.props.onPoemTitleChange}
          onTextChange={this.props.onPoemTextChange}/>
      </TabPanel>
    });

    return (
      <div className="Poems">
        <Tabs>
          <TabList>
            {tabTitles}
          </TabList>

          {tabContents}
        </Tabs>
      </div>
    );
  }
}

export default Poems;