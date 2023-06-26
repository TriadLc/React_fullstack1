import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageDoctor.scss";
import * as actions from "../../../store/actions";
import { FormattedMessage } from "react-intl";
import Select from "react-select";

import { CRUD_ACTIONS, LANGUAGES } from "../../../utils";
import { getDetailInforDoctorService } from "../../../services/userService";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
const mParser = new MarkdownIt();

class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Save to Markdown table
      contentMarkdown: "",
      contentHTML: "",
      selectedOption: "",
      description: "",
      listDoctors: [],
      hasOldData: false,

      //Save to doctor_infor table
      listPrice: [],
      listPayment: [],
      listProvince: [],
      selectedPrice: "",
      selectedPayment: "",
      selectedProvince: "",
      nameClinic: "",
      addressClinic: "",
      note: "",
    };
  }

  componentDidMount() {
    this.props.fetchAllDoctors();
    this.props.getAllRequiredDoctorInfor();
  }

  buildDataInputSelect = (inputData, type) => {
    let result = [];
    let { language } = this.props;

    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let object = {};
        // let labelVi = `${item.lastName} ${item.firstName}`;
        // let labelEn = `${item.firstName} ${item.lastName}`;
        let labelVi =
          type === "USERS"
            ? `${item.lastName} ${item.firstName}`
            : item.valueVi;
        let labelEn =
          type === "USERS"
            ? `${item.firstName} ${item.lastName}`
            : item.valueEn;
        object.value = item.id;
        object.label = language === LANGUAGES.VI ? labelVi : labelEn;
        result.push(object);
      });
      return result;
    }
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let dataSelect = this.buildDataInputSelect(
        this.props.allDoctors,
        "USERS"
      );
      this.setState({
        listDoctors: dataSelect,
      });
    }

    if (prevProps.language !== this.props.language) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
      this.setState({
        listDoctors: dataSelect,
      });
    }

    if (
      prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor
    ) {
      let { resPrice, resPayment, resProvince } =
        this.props.allRequiredDoctorInfor;
      let dataSelectPrice = this.buildDataInputSelect(resPrice);
      let dataSelectPayment = this.buildDataInputSelect(resPayment);
      let dataSelectProvince = this.buildDataInputSelect(resProvince);

      console.log(
        "HoiDanIt: data new: ",
        dataSelectPrice,
        dataSelectPayment,
        dataSelectProvince
      );

      this.setState({
        listPrice: dataSelectPrice,
        listPayment: dataSelectPayment,
        listProvince: dataSelectProvince,
      });
    }
  }

  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkdown: text,
      contentHTML: html,
    });
  };

  handleSaveContentMarkdown = () => {
    let { hasOldData } = this.state;
    this.props.saveDetailDoctor({
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.description,
      doctorId: this.state.selectedOption.value,
      action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,
    });
  };

  handleChangeSelect = async (selectedOption) => {
    this.setState({ selectedOption });

    let res = await getDetailInforDoctorService(selectedOption.value);
    if (res && res.errCode === 0 && res.data && res.data.Markdown) {
      let markdown = res.data.Markdown;
      this.setState({
        contentHTML: markdown.contentHTML,
        contentMarkdown: markdown.contentMarkdown,
        description: markdown.description,
        hasOldData: true,
      });
    } else {
      this.setState({
        contentHTML: "",
        contentMarkdown: "",
        description: "",
        hasOldData: false,
      });
    }
    console.log("HoiDanIt check: ", res);
  };

  // optionChanged = (value) => {
  //   console.log(value);
  //   this.setState({ selectedValue: value });
  // };

  handleOnChangeDesc = (event) => {
    this.setState({ description: event.target.value });
  };

  render() {
    let { hasOldData } = this.state;
    return (
      <React.Fragment>
        <div className="manage-doctor-container">
          <div className="manage-doctor-title">
            <FormattedMessage id="admin.manage-doctor.title" />
          </div>

          <div className="more-infor">
            <div className="more-infor-content-left row">
              <div className="col-8 form-group">
                <label>
                  <FormattedMessage id="admin.manage-doctor.select-doctor" />
                </label>
                <Select
                  value={this.state.selectedOption}
                  onChange={this.handleChangeSelect}
                  options={this.state.listDoctors}
                  placeholder={"Chọn bác sĩ"}
                />
              </div>

              <div className="col-2 form-group">
                <label>Doctor's ID</label>
                <input
                  className="form-control"
                  value={this.state.selectedOption.value}
                  disabled
                />
              </div>
              {/* <div className="col-5 form-group">
                <label>Số diện thoại</label>
                <input
                  className="form-control"
                  value={this.state.selectedOption.value}
                  disabled
                />
              </div>
              <div className="col-6 form-group">
                <label>Điện chỉ</label>
                <input
                  className="form-control"
                  value={this.state.selectedOption.value}
                  disabled
                />
              </div> */}
            </div>
            <div className="more-infor-content-right row">
              <div className="col-12 form-group">
                <label>
                  <FormattedMessage id="admin.manage-doctor.intro" />
                </label>
                <textarea
                  className="col-12 form-group"
                  rows={4}
                  onChange={(event) => this.handleOnChangeDesc(event)}
                  value={this.state.description}
                ></textarea>
              </div>
            </div>
          </div>

          <div className="more-infor-extra">
            <div className="floor-1 row">
              <div className="col-4 form-group">
                <label>Chon giá</label>
                <Select
                  //value={this.state.selectedOption}
                  //onChange={this.handleChangeSelect}
                  options={this.state.listPrice}
                  placeholder={"Chọn giá"}
                />
              </div>

              <div className="col-4 form-group">
                <label>Chọn tỉnh thành</label>
                <Select
                  //value={this.state.selectedOption}
                  //onChange={this.handleChangeSelect}
                  options={this.state.listProvince}
                  placeholder={"Chọn tỉnh thành"}
                />
              </div>
              <div className="col-4 form-group">
                <label>Chọn phương thức thanh toán</label>
                <Select
                  //value={this.state.selectedOption}
                  //onChange={this.handleChangeSelect}
                  options={this.state.listPayment}
                  placeholder={"Chọn phương thức thanh toán"}
                />
              </div>
            </div>

            <div className="floor-2 row">
              <div className="col-4 form-group">
                <label>Tên phòng khám </label>
                <input className="form-control" />
              </div>
              <div className="col-4 form-group">
                <label>Địa chỉ phòng khám </label>
                <input className="form-control" />
              </div>
              <div className="col-4 form-group">
                <label>Note </label>
                <input className="form-control" />
              </div>
            </div>
          </div>

          <div className="col-12 my-4 manage-doctor-editor">
            <MdEditor
              style={{ height: "480px" }}
              renderHTML={(text) => mParser.render(text)}
              onChange={this.handleEditorChange}
              value={this.state.contentMarkdown}
            />
          </div>
          <div className="col-12 text-center btn-control-doctor">
            <button
              onClick={() => this.handleSaveContentMarkdown()}
              className={
                hasOldData === true
                  ? "btn btn-primary save-content-doctor"
                  : "btn btn-primary create-content-doctor"
              }
            >
              {hasOldData === true ? (
                <span>
                  <FormattedMessage id="admin.manage-doctor.save" />
                </span>
              ) : (
                <span>
                  <FormattedMessage id="admin.manage-doctor.add" />
                </span>
              )}
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    allDoctors: state.admin.allDoctors,
    allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
    getAllRequiredDoctorInfor: () =>
      dispatch(actions.getAllRequiredDoctorInfor()),
    saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
