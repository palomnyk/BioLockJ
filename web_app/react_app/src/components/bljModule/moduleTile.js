import React, { Component } from 'react';

export class ModuleTile extends Component{
  constructor(props) {
    super(props);
    this.mod = this.props.mod;
    this.toggleDescript = this.toggleDescript.bind(this);
    this.state = {showDescript: true};
  }

  toggleDescript () {
    this.setState({ 
      showDescript: !this.state.showDescript
    });
  }

  render(){
    const descriptState = this.state.showDescript;
    let blurb;

    if (descriptState) {
      blurb = <h1 onClick={this.toggleDescript}>i</h1>;
    } else {
      blurb = <p onClick={this.toggleDescript}>
        Description: {this.props.module.description}
        <br/>
        Details: {this.props.module.description}
      </p>;
    }
    return (
      <div>
        {blurb}
        <p style={divStyle}>
        {this.props.module.title}
        </p>
      </div>
    );
  }
}

const divStyle = {
  backgroundColor: "green"
};

export default ModuleTile;