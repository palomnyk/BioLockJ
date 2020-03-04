import React, { Component } from 'react';
import moduleTile from './moduleTile.js'
import log from '../../images/BioLockJ_Logo_NoText_green.svg';

export class ModulesUnselected extends Component{

  constructor(props) {
    super(props);
    //TODO: add state?
    //this.state = {modules: []};
  }

  componentDidMount() {
    
  }

  render(){
    return (
      <div style={divStyle}>
        <header >
          Modules
        </header>
        <ul>
          
        </ul>

        
      </div>
    );
  }
}

const divStyle = {
  backgroundColor: "blue"
};

export default ModulesUnselected;
