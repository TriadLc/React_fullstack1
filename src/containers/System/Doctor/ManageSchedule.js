import React, { Component } from "react";
import { connect } from "react-redux";

class ManageSchedule extends Component {
  render() {
    return (
      <React.Fragment>
        <div>Mangae Schedule</div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
