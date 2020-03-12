import React, { Component } from 'react';
import ModuleTile from './moduleTile.js'

export class ModulesUnselected extends Component{
  render() {
    return (
      this.props.modules.map( module => (
        <ModuleTile 
        description = {module.description}
        details = {module.details}
        title = {module.title}
        key={module.title}/>
      ))
    );
  }
}

// const divStyle = {
//   backgroundColor: "white"
// };

export default ModulesUnselected;
