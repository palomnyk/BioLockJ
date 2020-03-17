import React, { Component } from 'react';

export class ModuleTile extends Component{
  constructor(props) {
    super(props);
    this.toggleDescript = this.toggleDescript.bind(this);
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
        Description: {this.props.description.toString()}
        <br/>
        
        Details: {this.props.details.toString()}
      </p>;
    }

    function dragStarted(evt) {
      //start drag
      let child = evt.target;
      for (var i=0; (child=child.previousSibling); i++);
      console.log(`source index in dragStarted: ${i}`);
      let data = {
        details: evt.target.getAttribute("details"),
        description: evt.target.getAttribute("description"),
        title: evt.target.getAttribute("title"),
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
      description = {this.props.description}
      title = {this.props.title}
      details = {this.props.details}
      data-tag={this.props.title}
      >
        {blurb}
        <p style={divStyle}>
        {this.props.title}
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