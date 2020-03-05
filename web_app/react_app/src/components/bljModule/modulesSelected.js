import React, { Component } from 'react';
import ModuleTile from './moduleTile.js'
import log from '../../images/BioLockJ_Logo_NoText_green.svg';

export class ModulesSelected extends Component{
  render(){
    return (
      <div style={divStyle}>
        <header >
          Selected moodules will go here.
        </header>
        Tiles
      </div>
    );
  }
}

const divStyle = {
  backgroundColor: "red"
};

export default ModulesSelected;
