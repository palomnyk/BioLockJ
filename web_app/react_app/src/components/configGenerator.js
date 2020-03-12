import React from 'react';
import ModulesUnselected from './bljModule/modulesUnselected.js'
import ModulesSelected from './bljModule/modulesSelected';
import ModuleTile from './bljModule/moduleTile.js'

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
      let data = JSON.parse(ev.dataTransfer.getData("module"));
      // console.log(`drop data: ${data}`)
      let newMod = {
        description: data.description,
        details: data.details,
        title: data.title,
        key: data.title,
      };
      let sm = document.getElementById("modulesSelected");
      let lastLi = document.getElementById("selectModulesLast");
      let smc = Array.from(sm.children);
      console.log(`sm.child1: ${smc}`);
      console.log(`sm: ${sm}`);
      console.log(`smc.length: ${smc.length}`);
      // console.log(newMod);
      if (this.state.selectedModules.length === 0 | ev.target === sm | ev.target === lastLi) {
        this.setState({ selectedModules: [...this.state.selectedModules, newMod] });
      } else {
        let child = ev.target;
        //try to get li index in child arrayf\
        for (var i=0; (child=child.previousSibling); i++);
        // var i = Array.prototype.indexOf.call(document.getElementById("modulesSelected").childNodes, child);
        console.log(`child: ${ev.target.innerHTML}`);
        console.log(`i : ${i}`);
        console.log(`ev.targ taaggg: ${ev.target.getAttribute("data-tag")}`);
        let newModArray = this.state.selectedModules;
        // console.log(`newModArray: ${newModArray}`);
        
        // let targTitle = newModArray.find( (mod) => {
        //   mod.title === ev.target.title});
        // let targIndex = this.state.selectedModules.indexOf(targTitle);
        newModArray.splice(i-1,0, newMod);
        this.setState({ selectedModules: newModArray });
      }
      // this.setState({selectedModules: this.state.selectedModules.push(newMod)});
      // ev.target.appendChild(document.getElementById(data));
    }
    return (
      <div style = {gridContainer} >
        <ul style = {modulesUnselectedStyle}>
          <ModulesUnselected  modules = {this.state.modules} />
        </ul>
        <ul 
        id = "modulesSelected"
        style = {modulesSelectedStyle} 
        onDrop={drop} 
        onDragOver={allowDrop}>
          <ModulesSelected modules = {this.state.selectedModules} />
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