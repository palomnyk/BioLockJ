import React, { Component } from 'react';
import InfoModuleDisplay, { InfoModalDisplay } from '../infoModalDisplay.js';

export class ModuleTile extends Component{
  constructor(props) {
    super(props);
  }

  render(){
    let dragStarted = (evt) =>{
      //start drag
      let child = evt.target;
      for (var i=0; (child=child.previousSibling); i++);
      if (evt.target.parentNode.id === "modulesUnselected"){
        
      }
      console.log(`source index in dragStarted: ${i}`);
      let data = {
        module: this.props.module,
        source: evt.target.parentNode.id,
        listIndex: i,
      };
      // console.log(`drag data: ${JSON.stringify(data)}`);
      evt.dataTransfer.setData("module", JSON.stringify(data));
      //specify allowed transfer
      evt.dataTransfer.effectAllowed = "move";
    };

    return (
      <li draggable="true" 
      onDragStart={dragStarted} 
      style={tileStyle}
      >
        <InfoModalDisplay
          description = {this.props.module.description}
          title = {this.props.module.title}
          details = {this.props.module.details}
          style = {{float: "left"}}
          />
        <span style={divStyle}>
        {this.props.module.title}
        </span>
      </li>
    );
  }
}

const tileStyle = {
  listStyleType: "none",
  // display: "inline",
  display: "block",
  // display: "-moz-inline-box",
  padding: "1px",
  margin: "0px",
};

const divStyle = {
  backgroundColor: "green",
  // position: "center",
};

export default ModuleTile;