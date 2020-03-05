import React from 'react';
import logo from '../images/BioLockJ_NoBG_green.svg';
import ModulesUnselected from './bljModule/modulesUnselected.js'
import ModulesSelected from './bljModule/modulesSelected';

class ConfigGenerator extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      selectedModules: [],
      //moduleSelectHandler: this.moduleSelectHandler.bind(this),
      selectedProperties: new Map(),
      modules: [],
      properties: new Map(),
    };
  }
  async fetchModList() {
    try {
      console.log("in fetchModList");
      const fetchParams = {
        method: 'post',
        headers: {
          "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        //TODO: add external module in body
       // body: JSON.stringify({jsonParam: "/dev/null"}),
      }
      const fetchModules = await fetch('/bljApiModuleInfo', fetchParams);
      let ml = await fetchModules.json();
      // console.log(JSON.parse(ml.output));
      return JSON.parse(ml.output);
    } catch (error) {
      console.error(error);
    }
  }

  componentDidMount(){
    this.fetchModList().then(
    (op) => {
      this.setState({modules: op});
      console.log(this.state.modules);
    });
    // this.setState({modules: this.fetchModList()});
  }

  render(){
    return (
      <div style = {gridContainer} >
        <ul style = {modulesUnselectedStyle}>
        <ModulesUnselected  modules = {this.state.modules} />
        </ul>
        <ul style = {modulesSelectedStyle}>
          <ModulesSelected />
        </ul>
          
        <div style = {preview}>Preview will go here.</div>
      </div>
    );
  }
}

const gridContainer = {
  display: 'grid',
  gridTemplateAreas:`
  'header header header header '
  'buttons unselect select preview'
  `,
  gridGap: '10px',
  backgroundColor: '#2196F3',
  padding: '10px',
};

const modulesUnselectedStyle = {
  gridArea: 'unselect',
  width: '20em',
};

const modulesSelectedStyle = {
  gridArea: 'select',
  backgroundColor: 'white'
}

const preview = {
  gridArea: 'preview',
}

export default ConfigGenerator;