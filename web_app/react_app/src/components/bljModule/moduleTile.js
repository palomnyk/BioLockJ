import React, { Component } from 'react';

export class ModuleTile extends Component{
  // constructor(props) {
  //   super(props);
  //   this.mod = this.props.mod
  //   //TODO: add state?
  //   //this.state = {modules: []};
  // }

  render(){
    return (
      <p style={divStyle}>
        {this.props.module.title}
      </p>
    );
  }
}

const divStyle = {
  backgroundColor: "green"
};

export default ModuleTile;