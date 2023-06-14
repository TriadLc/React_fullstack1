import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import Slider  from "react-slick";
import "./Specialty.scss";

class MedicalFacility extends Component {


  render() {
    
    return (
        <div className="section-share section-MedicalFacility">
            <div className="section-container">
                <div className="section-header">
                    <span className="title-section">Cơ sở Y tế</span>
                    <button className="btn-section">Xem thêm</button>
                </div>
                <div className="section-body">
                    <Slider {...this.props.settings}>
                        <div className="section-customize">
                            <div className="bg-image section-medical-facility"></div>
                            <div>Hệ thống Y tế 1</div>
                        </div>
                        <div className="section-customize">
                            <div className="bg-image section-medical-facility"></div>
                            <div>Hệ thống Y tế 2</div>
                        </div>
                        <div className="section-customize">
                            <div className="bg-image section-medical-facility"></div>
                            <div>Hệ thống Y tế 3</div>
                        </div>
                        <div className="section-customize">
                            <div className="bg-image section-medical-facility"></div>
                            <div>Hệ thống Y tế 4</div>
                        </div>
                        <div className="section-customize">
                            <div className="bg-image section-medical-facility"></div>
                            <div>Hệ thống Y tế 5</div>
                        </div>
                        <div className="section-customize">
                            <div className="bg-image section-medical-facility"></div>
                            <div>Hệ thống Y tế 6</div>
                        </div>
                    </Slider>
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
