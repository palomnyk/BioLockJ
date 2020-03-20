import React, { Component } from 'react';
import InfoModalDisplay from '../infoModalDisplay.js';


export class ModuleBar extends Component{

  constructor(props){
    super(props);
  }

  render() {
    return (
      <div>
        <InfoModalDisplay
          description = {this.props.description}
          title = {this.props.module.title}
          details = {this.props.module.details}
          style = {{float: "left"}}
          />
        {this.props.module.title}
      </div>
    )
  }
}

const liStyle = {
  listStyleType: "none"
};

export default ModuleBar;
