import React from "react";
import { Container } from "reactstrap";
import SideBar from "./SideBar";
import NavBar from "./NavBar";
import { postData3 } from "../../services/request";

export default class Reports extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: false,
      type: "",
      startDate: "",
      endDate: "",
      AdminName: "",
      btn: false,
    };
  }
  componentDidMount = async () => {
    let name = await sessionStorage.getItem("adminDetail");
    let Name = JSON.parse(name);
    this.setState({
      AdminName: Name[0].Name,
    });
  };

  GenerateReport = () => {
    this.setState({
      btn: true,
    });
    console.log(this.state.type, this.state.startDate, this.state.endDate);
    postData3("/api/white/report", {
      type: this.state.type,
      sdate: this.state.startDate,
      edate: this.state.endDate,
      Admin: this.state.AdminName,
    });
    this.setState({
      btn: false,
    });
  };
  render() {
    return (
      <>
        <Container
          fluid={true}
          className="container-edit desktop"
          style={{ height: "100vh" }}
        >
          <div className="row" style={{ height: "inherit" }}>
            <SideBar />
            <div className="col-11">
              <NavBar history={this.props.history} />
              {/* //.....Genrate Reports....// */}

              <div className="row heading-admin ml-3 mr-3 mt-3 font-gill">
                Generate Report
              </div>

              <div className="row mt-5 font-gill">
                <div className="container-fluid">
                  <div className="row justify-content-center">
                    <div className="col-11">
                      <div className="row justify-content-between">
                        <div className="col-5 report-col">
                          <div className="row justify-content-center">
                            <div className="col-11">
                              <div className="row pt-3">
                                <span style={{ fontSize: "20px" }}>
                                  Fill the from below to generate a report
                                </span>
                              </div>
                              <div className="row mt-3">
                                <label className="form-label ">
                                  Select Report Type
                                </label>
                                <select
                                  className="form-control"
                                  onChange={(e) => {
                                    this.setState({ type: e.target.value });
                                  }}
                                >
                                  <option selected></option>
                                  <option value="NIN">NIN</option>
                                  <option value="BVN">BVN</option>
                                  <option value="TIN">TIN</option>
                                  <option value="Phone">Phone</option>
                                  <option value="International Passport">
                                    International Passport
                                  </option>
                                </select>
                              </div>
                              <div className="row justify-content-between mt-4">
                                <div className="col-5">
                                  <label className="form-label ">
                                    Enter Start Date
                                  </label>
                                  <input
                                    type="date"
                                    className="form-control"
                                    onChange={(e) => {
                                      this.setState({
                                        startDate: e.target.value,
                                      });
                                    }}
                                    value={this.state.startDate}
                                  ></input>
                                </div>
                                <div className="col-5">
                                  <label className="form-label ">
                                    Enter End Date
                                  </label>
                                  <input
                                    type="date"
                                    className="form-control"
                                    onChange={(e) => {
                                      this.setState({
                                        endDate: e.target.value,
                                      });
                                    }}
                                    value={this.state.endDate}
                                  ></input>
                                </div>
                              </div>
                              <div className="row justify-content-end mt-5 mb-3">
                                {this.state.btn === false && (
                                  <div
                                    className="col-4 bt-gen"
                                    onClick={this.GenerateReport}
                                  >
                                    Generate
                                  </div>
                                )}
                                {this.state.btn === true && (
                                  <div className="col-4 bt-gen" disabled="true">
                                    Generate
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-5"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </>
    );
  }
}
