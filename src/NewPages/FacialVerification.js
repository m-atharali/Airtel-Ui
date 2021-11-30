import React from "react";
import "../assets/Style/personal.css";
import { Container, Row, Col } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleLeft, faEye } from "@fortawesome/free-solid-svg-icons";
import Fade from "react-reveal/Fade";
import { Redirect, Link } from "react-router-dom";
import { postData, postData3 } from "../services/request";
import swal from "sweetalert";
import Right from "./Common/Right2";
import Bottom from "./Common/Bottom";

var link = require("../assets/Lead-images/Afritech-logo.png");

export default class FacialVerification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nin: "",
      showErrorMsg: false,
      type: "password",
      loder: false,
      agentName: "",
      buttonState: false,
      AdminName: "",
    };
  }
  componentDidMount = () => {
    const agentlogin = sessionStorage.getItem("agentLogin");
    if (agentlogin != "true") {
      this.props.history.push("/");
    } else {
      sessionStorage.removeItem("auth");

      const agent = sessionStorage.getItem("agent");
      const agentName = JSON.parse(agent);
      console.log(agentName.Name);
      this.setState({
        agentName: agentName.Name,
        AdminName: agentName.AdminName,
      });
      const log = sessionStorage.getItem("agentLogin");
      const logData = JSON.parse(log);
      if (logData !== true) {
        this.props.history.push("/");
      }
    }
  };
  callNIN = () => {
    if (this.state.nin.length == 11) {
      this.setState({ showErrorMsg: false });
    } else {
      this.setState({ showErrorMsg: true });
    }
  };

  getNINInformation = async () => {
    if (this.state.nin === "") {
      swal("Please enter NIN number");
    } else {
      this.setState({
        loder: true,
        buttonState: true,
      });
      const bvnResponse = await postData("fetch-nin-nimc-linx", {
        nin: this.state.nin,
        api: "nin",
        username: this.state.agentName,
      });

      console.log(bvnResponse);
      if (bvnResponse.message === "Successful Hit.") {
        let addApi = {
          AgentName: this.state.agentName,
          AdminName: this.state.AdminName,

          API: "NIN",
          Date: new Date(),
        };
        postData("count-limit", {
          api: "nin",
          username: this.state.agentName,
        });
        postData3("/api/lead/request", addApi);

        swal("NIN found, please wait while we verify you");
        sessionStorage.setItem("auth", JSON.stringify(bvnResponse.data));
        this.props.history.push("/confirmation", { data: bvnResponse.data });
      } else if (
        bvnResponse.msg ===
        "Your limit for using this service has been reached."
      ) {
        swal("Your limit for using this service has been reached.");
      } else if (
        bvnResponse.message.message === "Request failed with status code 400"
      ) {
        swal("NIN provided is not valid");
      }
      this.setState({
        loder: false,
        buttonState: false,
      });
    }
  };

  render() {
    return (
      <Container fluid={true} className="container-edit">
        <Fade right>
          <Row style={{ height: "auto" }}>
            <Col md="5">
              <Right history={this.props.history} />
            </Col>
            <Col md="7" className="column-edit">
              <div
                style={{
                  width: "100%",
                  overflowY: "auto",
                  overflowX: "hidden",
                  height: "100vh",
                }}
              >
                <Row style={{ padding: "10px" }}>
                  <Col xs="4" lg="4">
                    <Link to="/welcome">
                      <FontAwesomeIcon
                        icon={faChevronCircleLeft}
                        size="3x"
                        color="#04478a"
                      />
                    </Link>
                  </Col>
                  <Col xs="2" lg="2"></Col>
                  <Col xs="3" lg="3" className="desktop"></Col>
                  <Col xs="3" lg="3">
                    {" "}
                    <img
                      src={link}
                      className="bg-light p-2 mr-2"
                      style={{ width: "140px" }}
                    />
                  </Col>
                </Row>
                <Row className="justify-content-center">
                  <Col lg="10" xs="10" className="text-center">
                    <div className="fcv-heading">Identity Verification</div>
                    {/* <div className="fcv-subheading">
                      Select a Service and fill out the field/s below
                    </div> */}
                  </Col>
                </Row>
                <Row className="mt-5">
                  <div className="col-10 px20">
                    <div
                      className="ml-2 radio-color"
                      onChange={(e) => {
                        this.setState({ find: e.target.value }, () => {
                          this.Change();
                        });
                      }}
                    >
                      <input
                        type="radio"
                        checked="true"
                        name="title"
                        className="ml-2"
                        value="nin"
                      ></input>
                      <label className="ml-2"> NIN Verification</label>
                    </div>
                  </div>
                </Row>
                <Row className="justify-content-center">
                  <Col lg="10" xs="10" className="text-center">
                    <div className="mt-4">
                      <Row>
                        <input
                          type={this.state.type}
                          className="form-control"
                          placeholder="Enter NIN"
                          onChange={(e) => {
                            this.setState({ nin: e.target.value }, () => {
                              this.callNIN();
                            });
                          }}
                          value={this.state.nin}
                        ></input>
                        <FontAwesomeIcon
                          onClick={() => {
                            this.setState({
                              type:
                                this.state.type == "password"
                                  ? "text"
                                  : "password",
                            });
                          }}
                          icon={faEye}
                          size="2x"
                          style={{
                            position: "absolute",
                            top: "30px",
                            right: "50px",
                          }}
                        />
                        {this.state.showErrorMsg && (
                          <p className="text-danger">
                            Please provide a valid nin number
                          </p>
                        )}
                      </Row>

                      <Row className=" mt-4 mb-3 justify-content-end">
                        <div className="col-6 col-sm-3">
                          <button
                            className="btn btn-bio"
                            onClick={this.getNINInformation}
                            type="button"
                            disabled={this.state.buttonState}
                          >
                            Next
                          </button>
                        </div>
                      </Row>

                      {this.state.loder && (
                        <Row className="justify-content-center">
                          <div className="col-4 mt-3">
                            <div className="spinner-border text-primary"></div>
                            <div className="spinner-border text-primary"></div>
                            <div className="spinner-border text-primary"></div>
                          </div>
                        </Row>
                      )}
                    </div>
                  </Col>
                </Row>

                <Row>
                  <Bottom />
                </Row>
              </div>
            </Col>
          </Row>
        </Fade>
      </Container>
    );
  }
}
