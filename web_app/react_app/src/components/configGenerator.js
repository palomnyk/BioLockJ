import React from 'react';
import logo from '../images/BioLockJ_NoBG_green.svg';
import '../App.css';
import '../tests/apiTests.js'
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
      const fetchParams = {
        method: 'post',
        headers: {
          "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        //TODO: add external module in body
       // body: JSON.stringify({jsonParam: "/dev/null"}),
      }
      const modules = await fetch('/bljApiListModules', fetchParams)
      let ml = await modules.json();
      console.log(ml.output);
      return ml;
    } catch (error) {
      console.error(error);
    }
  }
  async componentDidMount(){
    this.setState({modules: await this.fetchModList()});
    console.log(this.modules);
    
  }

  render(){
    return (
      <div className="App">
        <img src={logo} className="App-logo" alt="logo" />
        <header className="App-header">
          App 
        </header>
          <ModulesUnselected />
          <ModulesSelected/>
      </div>
    );
  }
}

const divStyle = {
  display: "flex",
  flex: 1, 
  flexDirection: 'row'
};



export default ConfigGenerator;