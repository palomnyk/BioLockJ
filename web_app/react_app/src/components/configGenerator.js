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
      <div className="App">
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