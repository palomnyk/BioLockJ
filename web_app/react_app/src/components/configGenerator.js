import React from 'react';
import ModulesUnselected from './bljModule/modulesUnselected.js'
import ModulesSelected from './bljModule/modulesSelected';
import ModuleListLayout from './bljModule/moduleListLayout';
import ModuleTile from './bljModule/moduleTile.js';
// import ModuleTile from './bljModule/moduleTile.js'

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

  async fetchModJson() {
    try {
      console.log("in fetchModJson");
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
    //add module JSON to state
    this.fetchModJson().then(
    (op) => {
      this.setState({modules: op});
      console.log(this.state.modules);
    });
    // this.setState({modules: this.fetchModJson()});
  }

  render(){
    let allowDrop = (ev) => {
      ev.preventDefault();
      // ev.stopPropagation();
    }
    let drop = (ev) => {
      ev.preventDefault();
      ev.persist();
      let data = JSON.parse(ev.dataTransfer.getData("module"));
      let dropMod =  data.module;
      console.info(dropMod);
      let source = data.source;
      let child = ev.target;
      for (var i=0; (child=child.previousSibling); i++);
      console.log(`index of child ${i}`);
      let newModArray = [...this.state.selectedModules];
      let sm = document.getElementById("modulesSelected");
      let lastLi = document.getElementById("selectModulesLast");
      if (source === "modulesUnselected") {
        if (this.state.selectedModules.length === 0 || ev.target === sm || ev.target === lastLi) {
          console.log("this.state.selectedModules; after modulesUnselected if");
          this.setState({ selectedModules: [...this.state.selectedModules, dropMod] },
            console.info(this.state.selectedModules));
        } else {
          //try to get li index in child array
          newModArray.splice(i,0, dropMod);
          console.log("this.state.selectedModules after modulesUnselected else");
          this.setState({ selectedModules: newModArray }, console.info(this.state.selectedModules));
        }
      }
      if (source === "modulesSelected") {
        if (data.listIndex === i){
          console.log("dropped module on itself");
          
        }else{
        // console.log(`in if (source === "modulesSelected"`);
        newModArray.splice(data.listIndex,1);
        newModArray.splice(i,0,dropMod);
        console.log("newModArray");
        console.info(newModArray);
        this.setState({ selectedModules: newModArray });
        }
      }
    }
    return (
      <div style = {gridContainer} >
        <ul id = "modulesUnselected" style = {modulesUnselectedStyle}>
          <ModuleListLayout  modules = {this.state.modules} />
        </ul>
        <ul 
        id = "modulesSelected"
        style = {modulesSelectedStyle} 
        onDrop={drop} 
        onDragOver={allowDrop}>
          <ModuleListLayout modules = {this.state.selectedModules} />
          <li style = {lastLiStyle} id="selectedModsLast" draggable="false"></li>
        </ul>
        <div style = {preview}></div>
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

const lastLiStyle = {
  listStyleType: "none",
  backgroundColor: 'red',
  color: "red"
};

const modulesUnselectedStyle = {
  gridArea: 'unselect',
  width: '20em',
  backgroundColor: 'yellow',
};

const modulesSelectedStyle = {
  gridArea: 'select',
  backgroundColor: 'white'
}

const preview = {
  gridArea: 'preview',
}

export default ConfigGenerator;