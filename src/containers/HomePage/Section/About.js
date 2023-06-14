import React, { Component } from "react";
import { connect } from "react-redux";

class About extends Component {


  render() {
    
    return (
       <div className="section-share section-hand">
        This is About
       </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
