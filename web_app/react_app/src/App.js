import React from 'react';
import logo from './images/BioLockJ_NoBG_green.svg';
import './App.css';
import './tests/apiTests.js'


class App extends React.Component{
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
  render(){
    return (
      <div className="App">
        <img src={logo} className="App-logo" alt="logo" />
        <header className="App-header">
          App
        </header>
      </div>
    );
  }
}

export default App;
