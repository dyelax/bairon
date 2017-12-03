import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import PoetryEditor from './PoetryEditor';
import plus from './img/plus.svg';
import x from './img/x.svg';

class Poems extends Component {

  render() {
    var deletePoem = this.props.deletePoem;
    var poems = this.props.poems;
    var currentPoem = Math.max(this.props.currentPoem, poems.length - 1);
    // console.log('rendering Poems component');
    // console.log(currentPoem);
    var tabTitles = poems.map((poem, i) => {
      function deletePoemByEvent(e) {
        deletePoem(i)
      };

      return (<Tab key={'tab'+i}>
        {poem.title}
        <img alt="delete poem" onClick={deletePoemByEvent} className="x-icon" src={x}></img>
      </Tab>);
    });

    var tabContents = this.props.poems.map((poem, i) => {
      return <TabPanel key={'panel'+i}>
        <PoetryEditor
          focused={currentPoem === i}
          index={i}
          title={poem.title}
          text={poem.text}
          onTitleChange={this.props.onPoemTitleChange}
          onTextChange={this.props.onPoemTextChange}
          onSelectionChange={this.props.onSelectionChange}/>
      </TabPanel>
    });

    return (
      <div className="Poems">
        <Tabs 
          defaultFocus={true}
          selectedIndex={this.props.currentPoem}
          onSelect={this.props.onSelectPoem}>
          <TabList>
            {tabTitles}
            <img alt="add poem" onClick={this.props.addPoem} className="plus-icon" src={plus}></img>
          </TabList>

          {tabContents}
        </Tabs>
      </div>
    );
  }
}

export default Poems;