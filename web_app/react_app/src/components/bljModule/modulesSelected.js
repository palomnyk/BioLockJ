import React, { Component } from 'react';
import ModuleTile from './moduleTile.js'
// import log from '../../images/BioLockJ_Logo_NoText_green.svg';

export class ModulesSelected extends Component{

  constructor(props){
    super(props);
  }

  render() {
    if (this.props.modules) {
      return (
        this.props.modules.map( module => (
          <ModuleTile 
          description = {module.description}
          details = {module.details}
          title = {module.title}
          key={module.title}/>
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

export default ModulesSelected;
