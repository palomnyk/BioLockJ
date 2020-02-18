import React from 'react';
import logo from './logo.svg';
import './App.css';

function promiseFromNode(address, jsonParam, method = 'POST') {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open(method, address, true);
    request.setRequestHeader("Content-Type", "application/json");
    request.send(jsonParam);
    request.onreadystatechange = function() {
      if (request.readyState === XMLHttpRequest.DONE) {
        try {
          if(this.status === 200 && request.readyState === 4){
            resolve(this.responseText);
          }else{
            reject(this.status + " " + this.statusText)
          }
        } catch (e) {
          reject (e.message)
        }
      }
    }
  });
}

let test = promiseFromNode('/bljApiListModules', JSON.stringify({jsonParam: "/dev/null"}));
test.then((modules) => {
  console.log(modules);
});



function App() {
  /*Rules for building state:
      Unfinished configs and finished pipelines will count as pipelines
      Finished configs of finished pipelines are not editable

    Example state:
      pipelines: [ 
      {
        pipeline: "16sRdpPipeline1",
        project: "Wastewater project",
        date_created: "2018-8-1",
        date_modified: "2018-8-1",
        date_run:"2018-8-1",
        pipeline_location: "/pipelines/16sRdpPipeline1-2018Aug1",
        config_location: "/pipelines/16sRdpPipeline1-2018Aug1/16sRdpPipeline1.properties",
        successful_run: true,
        minimized: true,
      },
      {
        pipeline: "ITsRdpPipeline1",
        project: "Wastewater project",
        date_created: "2018-8-30",
        date_modified: "2018-8-30",
        date_run:"2018-8-30",
        pipeline_location: "/pipelines/ITsRdpPipeline1-2018Apr30",
        config_location: "/pipelines/ITsRdpPipeline1-2018Apr30/16sRdpPipeline1.properties",
        successful_run: true,
        minimized: true,
      },
      {
        pipeline: "ITsRdpPipeline2",
        project: "Wastewater project",
        date_created: "2018-9-30",
        date_modified: "2018-9-30",
        date_run:null,
        pipeline_location: null,
        config_location: "/pipelines/ITsRdpPipeline1-2018Apr30/16sRdpPipeline1.properties",
        successful_run: false,
        minimized: true,
    },
    ]

  */
  // this.state = {
  //   pipelines: [ 
  //     {
  //       pipeline: "16sRdpPipeline1",
  //       project: "Wastewater project",
  //       date_created: "2018-8-1",
  //       date_modified: "2018-8-1",
  //       date_run:"2018-8-1",
  //       pipeline_location: "/pipelines/16sRdpPipeline1-2018Aug1",
  //       config_location: "/pipelines/16sRdpPipeline1-2018Aug1/16sRdpPipeline1.properties",
  //       successful_run: true,
  //       minimized: true,
  //     },
  //     {
  //       pipeline: "ITsRdpPipeline1",
  //       project: "Wastewater project",
  //       date_created: "2018-8-30",
  //       date_modified: "2018-8-30",
  //       date_run:"2018-8-30",
  //       pipeline_location: "/pipelines/ITsRdpPipeline1-2018Apr30",
  //       config_location: "/pipelines/ITsRdpPipeline1-2018Apr30/16sRdpPipeline1.properties",
  //       successful_run: true,
  //       minimized: true,
  //     },
  //     {
  //       pipeline: "ITsRdpPipeline2",
  //       project: "Wastewater project",
  //       date_created: "2018-9-30",
  //       date_modified: "2018-9-30",
  //       date_run:null,
  //       pipeline_location: null,
  //       config_location: "/pipelines/ITsRdpPipeline1-2018Apr30/16sRdpPipeline1.properties",
  //       successful_run: false,
  //       minimized: true,
  //   },
  //   ]
  // }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p></p>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
