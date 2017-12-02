import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import PoetryEditor from './PoetryEditor';
import plus from './img/plus.svg';
import x from './img/x.svg';

class Poems extends Component {

  render() {
    var deletePoem = this.props.deletePoem;
    var currentPoem = this.props.currentPoem;
    var tabTitles = this.props.poems.map((poem, i) => {
      function deletePoemByEvent(e) {
        deletePoem(i)
      };

      return (<Tab key={'tab'+i}>
        {poem.title}
        <img onClick={deletePoemByEvent} className="x-icon" src={x}></img>
      </Tab>);
    });

    var tabContents = this.props.poems.map((poem, i) => {
      return <TabPanel key={'panel'+i}>
        <PoetryEditor
          focused={currentPoem == i}
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
            <img onClick={this.props.addPoem} className="plus-icon" src={plus}></img>
          </TabList>

          {tabContents}
        </Tabs>
      </div>
    );
  }
}

export default Poems;