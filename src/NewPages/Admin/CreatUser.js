import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import Right2 from "../Common/Right2";
import { postData3 } from "../../services/request";
import swal from "sweetalert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons";

var link = require("../../assets/white-images/link.png");
var pay = require("../../assets/white-images/payvision.png");

export default class UserCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      username: "",
      password: "",
      repaswd: "",
      loader: false,
    };
  }

  addNew = async () => {
    this.setState({
      loder: true,
    });

    if (
      !this.state.username == "" &&
      !this.state.password == "" &&
      !this.state.repaswd == ""
    ) {
      if (this.state.password != this.state.repaswd) {
        swal("Your Password does not match.");
      } else {
        let User = {
          Username: this.state.username,
          Password: this.state.password,
          Name: this.state.name,
        };
        const result = await postData3("/api/white/add", User);
        if (result.status == true) {
          this.setState({
            username: "",
            password: "",
            repaswd: "",
            name: "",
          });
          swal("You create a new user");
        } else {
          this.setState({ username: "", password: "", repaswd: "" });
          swal("Some error creating in a new user");
        }
      }
    } else {
      swal("Please fill all the field");
    }
    this.setState({
      loder: false,
    });
  };
  render() {
    return (
      <Container fluid={true} className="container-edit">
        <Row className="">
          <Col md="5">
            <Right2 />
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
                <Col xs="4" lg="4">
                  <Link to="/adminhome">
                    <FontAwesomeIcon
                      icon={faChevronCircleLeft}
                      size="3x"
                      color="#04478a"
                    />
                  </Link>
                </Col>
                <Col xs="2" lg="2" className="desktop"></Col>
                <Col xs="3" lg="4"></Col>
                <Col xs="3" lg="2" className="desktop">
                  {" "}
                  <img
                    src={link}
                    className="bg-light p-2 mr-2"
                    style={{ width: "100px" }}
                  />
                  <img
                    src={pay}
                    className="bg-light p-2 mr-2"
                    style={{ width: "100px" }}
                  />
                </Col>
                <Col xs="2" className="mobile">
                  <img
                    src={link}
                    alt=""
                    style={{
                      marginLeft: "auto",
                      marginRight: "auto",
                      display: "block",
                      width: "70px",
                    }}
                  />
                  <img
                    src={pay}
                    alt=""
                    style={{
                      marginLeft: "auto",
                      marginRight: "auto",
                      display: "block",
                      width: "70px",
                    }}
                  />
                </Col>
              </Row>

              <br />
              <Container>
                <Row className="justify-content-center">
                  <Col lg="8" xs="12" className="text-center">
                    <div className="fcv-heading">Create a New Agent</div>
                  </Col>
                </Row>

                <Row className="justify-content-center">
                  <Col lg="7">
                    <form>
                      <div className="row mt-2">
                        <div className="col">
                          <label>Name</label>
                          <input
                            type="text"
                            className="form-control"
                            onChange={(e) => {
                              this.setState({ name: e.target.value });
                            }}
                            value={this.state.name}
                          ></input>
                        </div>
                      </div>
                      <div className="row mt-2">
                        <div className="col">
                          <label>Username</label>
                          <input
                            type="text"
                            className="form-control"
                            onChange={(e) => {
                              this.setState({ username: e.target.value });
                            }}
                            value={this.state.username}
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
                              this.setState({ password: e.target.value });
                            }}
                            value={this.state.password}
                          ></input>
                        </div>
                      </div>
                      <div className="row mt-2">
                        <div className="col">
                          <label>Retry Password</label>
                          <input
                            type="password"
                            className="form-control"
                            onChange={(e) => {
                              this.setState({ repaswd: e.target.value });
                            }}
                            value={this.state.repaswd}
                          ></input>
                        </div>
                      </div>

                      <div className="row mt-2 justify-content-center"></div>
                      <div className="row mt-4">
                        <div className="col">
                          <button
                            className="btn btn-bio"
                            onClick={this.addNew}
                            type="button"
                          >
                            CREATE
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
                <div className="bottom-text">
                  Powered by{" "}
                  <a
                    href="https://idverify.com.ng"
                    style={{ fontWeight: "bold" }}
                  >
                    Afritech
                  </a>
                </div>
              </Container>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}
