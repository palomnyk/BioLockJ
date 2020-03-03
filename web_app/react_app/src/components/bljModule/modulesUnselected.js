import React, { Component } from 'react';
import moduleTile from './moduleTile.js'
import log from '../../images/BioLockJ_Logo_NoText_green.svg';

export class ModulesUnselected extends Component{

  constructor(props) {
    super(props);
    //TODO: add state?
    //this.state = {modules: []};
  }

  componentDidMount() {
    this.TestFunct();
    
  }
  TestFunct = async function ML() {
    try {
      const fetchParams = {
        method: 'post',
        headers: {
          "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        //TODO: add external module in body
       // body: JSON.stringify({jsonParam: "/dev/null"}),
      }
      console.table("did I mount?");
      const modules = await fetch('/bljApiListModules', fetchParams)
      console.log("in TestFunct");
      // console.table(String(modules.text));
      console.log(String(modules.body));

      // console.log(modules.responseText());
      
      let ml = await modules.json();
      console.log(ml.output);
      // console.log(ml.output);
    } catch (error) {
      console.error(error);
      
    }
  }
  // //Call api and get module list
  // ModuleList = async function(){
  //   try {
  //     const modules = await fetch('/bljApiListModules', 
  //     {
  //       method: 'post',
  //       headers: {
  //         "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
  //       },
  //       //TODO: add external module in body
  //       body: JSON.stringify({jsonParam: "/dev/null"}),
  //     })
  //     console.log(JSON.parse(modules));
    
      
  //   } catch (error) {
  //     console.error(error);
  //   };
  // };//end ModuleList
  // let modules = promiseFromNode('/bljApiListModules', JSON.stringify({jsonParam: "/dev/null"}))

  render(){
    return (
      <div style={divStyle}>
        <header >
          Modules
        </header>
        
      </div>
    );
  }
}

const divStyle = {
  backgroundColor: "blue"
};

export default ModulesUnselected;
