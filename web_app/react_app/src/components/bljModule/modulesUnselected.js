import React, { Component } from 'react';
import ModuleTile from './moduleTile.js'
import log from '../../images/BioLockJ_Logo_NoText_green.svg';

export class ModulesUnselected extends Component{
  render() {
    return this.props.modules.map( module => (
      <ModuleTile module = {module} key={module.title}/>
    ));
  }
}

const divStyle = {
  backgroundColor: "white"
};

export default ModulesUnselected;
