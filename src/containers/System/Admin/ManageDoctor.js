import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageDoctor.scss";
import * as actions from "../../../store/actions";
import { FormattedMessage } from "react-intl";
import Select from "react-select";

//import "react-select/dist/react-select.css";
import "react-virtualized-select/styles.css";
import VirtualizedSelect from "react-virtualized-select";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { LANGUAGES } from "../../../utils";
const mParser = new MarkdownIt();

const options = [
  { value: "chocolate", label: "Chocolate000000000000000" },
  { value: "strawberry", label: "Strawberry000000000000000000" },
  { value: "vanilla", label: "Vanilla000000000000000000" },
];

class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentMarkdown: "",
      contentHTML: "",
      //selectedOption: [],
      selectedOption: "",
      description: "",
      listDoctors: [],
    };
  }

  componentDidMount() {
    this.props.fetchAllDoctors();
  }

  builDataInputSelect = (inputData) => {
    let result = [];
    let { language } = this.props;

    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let object = {};
        let labelVi = `${item.lastName} ${item.firstName}`;
        let labelEn = `${item.firstName} ${item.lastName}`;

        object.value = item.id;
        object.label = language === LANGUAGES.VI ? labelVi : labelEn;

        // object.label =
        //   language === LANGUAGES.VI
        //     ? `${item.lastName} ${item.firstName}`
        //     : `${item.firstName} ${item.lastName}`;

        result.push(object);
      });
      //console.log("Check result: ", result);
      return result;
    }
  };
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let dataSelect = this.builDataInputSelect(this.props.allDoctors);
      console.log("Check dataSelect", dataSelect);
      console.log("Check options", options);
      this.setState({
        listDoctors: dataSelect,
      });
    }
    //console.log("Check listDoctors", this.listDoctors);
    if (prevProps.language !== this.props.language) {
      let dataSelect = this.builDataInputSelect(this.props.allDoctors);
      this.setState({
        listDoctors: dataSelect,
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
    this.props.saveDetailDoctor({
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.description,
      doctorId: this.state.selectedOption.value,
    });
    //console.log("HoiDanIt check state: ", this.state);
  };

  handleChange = (selectedOption) => {
    // this.setState({ selectedOption }, () =>
    //   console.log(
    //     "Check props selectedOption: ",
    //     selectedOption.label,
    //     selectedOption,
    //     this.state.selectedOption
    //   )
    // );
    this.setState({ selectedOption });
  };

  optionChanged = (value) => {
    console.log(value);
    this.setState({ selectedValue: value });
  };

  handleOnChangeDesc = (event) => {
    this.setState({ description: event.target.value });
  };

  render() {
    //console.log("HoiDanIt: ", this.state);
    let labelValue = this.state.selectedOption.label;
    console.log("Check selectedOption in prop: ", labelValue);
    return (
      <div className="manage-doctor-container">
        <div className="manage-doctor-title">Tạo thêm thông tin doctor</div>
        <div className="more-infor">
          <div className="col-6 my-3 content-left form-group">
            <label>Vui lòng chọn bác sĩ</label>
            <Select
              className="col-10 my-3"
              //placeholder="Select doctor..."
              //value={labelValue}
              value={this.state.selectedOption}
              onChange={this.handleChange}
              //options={options}
              options={this.state.listDoctors}
              //isClearable={false}
            />
            {/* <VirtualizedSelect
              //className="col-8 my-3"
              //placeholder="Select user..."
              onChange={this.handleChange}
              //options={this.state.listDoctors}
              options={this.state.listDoctors}
              value={this.state.selectedOption}
              isClearable
            /> */}
            <input
              className="col-8 my-3"
              placeholder="In ra label?"
              value={this.state.selectedOption.label}
            />
            <input
              className="col-8 my-3"
              placeholder="In ra value??"
              value={this.state.selectedOption.value}
            />
          </div>
          <div className="content-right">
            <label>Thong tin gioi thieu:</label>
            <textarea
              className="col-8 form-control"
              rows="4"
              onChange={(event) => this.handleOnChangeDesc(event)}
              value={this.state.description}
            ></textarea>
          </div>
        </div>
        <div className="manage-doctor-editor">
          <MdEditor
            style={{ height: "500px" }}
            renderHTML={(text) => mParser.render(text)}
            onChange={this.handleEditorChange}
          />
        </div>
        <button
          onClick={() => this.handleSaveContentMarkdown()}
          className="save-content-doctor"
        >
          Luu thong tin
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    allDoctors: state.admin.allDoctors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
    saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
