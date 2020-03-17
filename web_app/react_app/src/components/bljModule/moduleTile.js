import React, { Component } from 'react';

export class ModuleTile extends Component{
  constructor(props) {
    super(props);
    this.toggleDescript = this.toggleDescript.bind(this);
    this.module = this.props.module;
    this.state = {showDescript: true};
  }

  toggleDescript () {
    this.setState({ 
      showDescript: !this.state.showDescript
    });
  }

  render(){
    const descriptState = this.state.showDescript;
    let blurb;

    if (descriptState) {
      blurb = <p onClick={this.toggleDescript}>i</p>;
    } else {
      blurb = <p onClick={this.toggleDescript}>
        Description: {this.props.module.description.toString()}
        <br/>
        
        Details: {this.props.module.details.toString()}
      </p>;
    }

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
      <React.Fragment>
      <li draggable="true" 
      onDragStart={dragStarted} 
      style={tileStyle}
      description = {this.props.module.description}
      title = {this.props.module.title}
      details = {this.props.module.details}
      >
        {blurb}
        <p style={divStyle}>
        {this.props.module.title}
        </p>
      </li>
      </React.Fragment>
    );
  }
}

const tileStyle = {
  listStyleType: "none"
};

const divStyle = {
  backgroundColor: "green"
};

export default ModuleTile;