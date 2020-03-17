import React, { Component } from 'react';
import ModuleTile from './moduleTile.js'
// import log from '../../images/BioLockJ_Logo_NoText_green.svg';

export class ModuleListLayout extends Component{

  constructor(props){
    super(props);
  }

  render() {
    if (this.props.modules) {
      return (
        this.props.modules.map( module => (
          <ModuleTile 
          module = {module}
          key={module.title}
          />
        ))
      );
    } else {
      return (
        <li style = {liStyle}>Place selected modules here.</li>
      )
    }
    
  }
}

const liStyle = {
  listStyleType: "none"
};

export default ModuleListLayout;
