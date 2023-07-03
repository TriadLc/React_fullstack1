import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorExtraInfor.scss";
import { LANGUAGES } from "../../../utils";

class DoctorExtrainInfor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDetailInfor: false,
    };
  }

  async componentDidMount() {}

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }
  showHideDetailInfor = (status) => {
    this.setState({
      isShowDetailInfor: status,
    });
  };

  render() {
    let { isShowDetailInfor } = this.state;

    return (
      <React.Fragment>
        <div className="doctor-extra-infor-container">
          <div className="content-up">
            <div className="text-address">DIA CHI</div>
            <div className="name-clinic">PHONG khám chuyên khoá</div>
            <div className="detail-address">
              207 Pho Hue - Hai Ba Trung - Ha Noi
            </div>
          </div>
          <div className="content-down">
            {isShowDetailInfor === false && (
              <div className="short-infor">
                Gia kham: 250.000
                <span onClick={() => this.showHideDetailInfor(true)}>
                  Xem chi tiet
                </span>
              </div>
            )}

            {isShowDetailInfor === true && (
              <>
                <div className="title-price">GIa kham: .</div>
                <div className="detail-infor">
                  <div className="price">
                    <span className="left">Gia kham</span>
                    <span className="right">250.000d</span>
                  </div>
                  <div className="note">
                    Duoc ua tien kham truoc khi dat kham
                  </div>
                  <div className="payment">
                    Nguoi benh co the thanh toan bang
                  </div>
                  <div className="hide-price">
                    <span onClick={() => this.showHideDetailInfor(false)}>
                      An bang gia
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtrainInfor);
