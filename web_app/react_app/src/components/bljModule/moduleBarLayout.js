import React, { Component } from 'react';
import ModuleBar from './moduleBar.js'

export class ModuleBarLayout extends Component{

  render() {
    return (
      this.props.modules.map( module => (
        <ModuleBar 
        module = {module}
        key={module.title}
        />
      ))
    );
  } 
}

export default ModuleBarLayout;
