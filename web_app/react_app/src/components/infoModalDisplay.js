import React from 'react';
import PropTypes from 'prop-types';

export class InfoModalDisplay extends React.Component{

  constructor(props){
    super(props);
    this.state = {modalDisplay: false};
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal () {
    this.setState({ 
      modalDisplay: !this.state.modalDisplay,
    });
  }

  render() {
    if (this.state.modalDisplay === false) {
      return <span onClick={this.toggleModal}
      style = {iStyle}
      >i</span>;
    } else {
      return <div style = {modalStyle} 
      onClick={this.toggleModal} 
      onBlur={this.toggleModal}
      >description: {this.props.description}
        details: {this.props.details}</div>;
    }
  }
}

const iStyle = {
  float: "left",
}

const modalStyle = {
  display: "block",
  position: "relative", /* Stay in place */
  right: "10em",
  zIndex: 1, /* Sit on top */
  width: "100%", /* Full width */
  height: "100%", /* Full height */
  overflow: "auto", /* Enable scroll if needed */
  backgroundColor: "#5cb85c", /* Fallback color */
  // backgroundColor: "rgba(0,0,0,0.4)", /* Black w/ opacity */
  overflow: "scroll",
  marginTop:" -50%",
  marginBottom: "-50%",
};

InfoModalDisplay.propTypes = {
  description: PropTypes.string.isRequired,
  details: PropTypes.string.isRequired
};