import React, { Component } from 'react';
import moduleTile from './moduleTile.js'
import log from '../../images/BioLockJ_Logo_NoText_green.svg';

export class ModulesSelected extends Component{
  render(){
    return (
      <div style={divStyle}>
        <header >
          Modules
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
