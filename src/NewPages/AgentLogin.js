import React from "react";
import { Container, Row, Col } from "reactstrap";
import "../assets/Style/personal.css";
import Fade from "react-reveal/Fade";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleLeft, faEye } from "@fortawesome/free-solid-svg-icons";
import { Redirect, Link } from "react-router-dom";
import RightSide from "./Common/RightSide";
import { postData3 } from "../services/request";
import swal from "sweetalert";
import Bottom from "./Common/Bottom";

var link = require("../assets/Lead-images/Afritech-logo.png");

export default class AgentLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedin: false,
      loader: false,
      user: "",
      paswd: "",
      // showSuccess: false,
    };
  }

  checkLogin = async () => {
    this.setState({
      loder: true,
    });
    if (!this.state.user == "" && !this.state.paswd == "") {
      const login = this.state;
      const result = await postData3("/api/lead/check", login);
      if (result.length == 1) {
        sessionStorage.setItem("agentLogin", true);
        sessionStorage.setItem("agent", JSON.stringify(result[0]));
        swal("You are Logged in");
        this.props.history.push("/welcome");
      } else {
        this.setState({ user: "", paswd: "" });
        swal(
          "Username & Password Not Match. Please Enter the Correct Username & Password"
        );
      }
    } else {
      swal("Please give right Agent Username and Password");
    }
    this.setState({
      loder: false,
    });
  };

  render() {
    if (this.state.loggedin === true) {
      return <Redirect to="/" />;
    }
    return (
      <Container fluid={true} className="container-edit">
        <Fade right>
          <Row noGutters={true}>
            <Col md="5">
              <RightSide />
            </Col>

            <Col md="7" className="column-edit">
              <div
                style={{
                  height: "100vh",
                  overflowY: "auto",
                  overflowX: "hidden",
                }}
              >
                <Row style={{ padding: "10px" }}>
                  <Col xs="8" lg="8">
                    <Link to="/">
                      <FontAwesomeIcon
                        icon={faChevronCircleLeft}
                        size="3x"
                        color="#04478a"
                      />
                    </Link>
                  </Col>
                  <Col lg="3" className="">
                    <img
                      src={link}
                      alt=""
                      style={{
                        marginLeft: "auto",
                        marginRight: "auto",
                        display: "block",
                        width: "110px",
                      }}
                    />
                  </Col>
                </Row>

                <br />
                <Container>
                  <Row className="justify-content-center">
                    <Col lg="8" xs="12" className="text-center">
                      <div className="fcv-heading">Login</div>
                      <div className="fcv-subheading">
                        Welcome back, please log into your account
                      </div>
                    </Col>
                  </Row>

                  <Row className="justify-content-center">
                    <Col lg="7">
                      <form>
                        <div className="row mt-2">
                          <div className="col">
                            <label>Username</label>
                            <input
                              type="text"
                              className="form-control"
                              onChange={(e) => {
                                this.setState({ user: e.target.value });
                              }}
                            ></input>
                          </div>
                        </div>
                        <div className="row mt-2">
                          <div className="col">
                            <label>Password</label>
                            <input
                              type="password"
                              className="form-control"
                              onChange={(e) => {
                                this.setState({ paswd: e.target.value });
                              }}
                            ></input>
                          </div>
                        </div>

                        <div className="row mt-2 justify-content-center"></div>
                        <div className="row mt-4">
                          <div className="col">
                            <button
                              className="btn btn-bio"
                              onClick={this.checkLogin}
                              type="button"
                            >
                              Login
                            </button>
                          </div>
                        </div>
                      </form>
                    </Col>
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
                  <Bottom />
                </Container>
              </div>
            </Col>
          </Row>
        </Fade>
      </Container>
    );
  }
}
