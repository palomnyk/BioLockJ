import React, { Component } from 'react';
import InfoModalDisplay from '../infoModalDisplay.js';
import PropertiesLayout from '../propertiesLayout';

export class ModuleBar extends Component{

  constructor(props){
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <div>
          <InfoModalDisplay
            description = {this.props.module.description}
            title = {this.props.module.title}
            details = {this.props.module.details}
            style = {{float: "left"}}
            />
          {this.props.module.title}
        </div>
        <div>
          <PropertiesLayout
          properties = {this.props.module.properties}
          />
        </div>
      </React.Fragment>
    )
  }
}

const liStyle = {
  listStyleType: "none"
};

export default ModuleBar;
