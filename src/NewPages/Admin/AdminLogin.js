import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import Right2 from "../Common/Right2";
import swal from "sweetalert";
import { postData3 } from "../../services/request";
import Bottom from "../Common/Bottom";

var link = require("../../assets/Lead-images/Afritech-logo.png");

export default class AdminLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: false,
      username: "",
      password: "",
    };
  }

  componentDidMount = () => {
    sessionStorage.removeItem("adminLogin");
    sessionStorage.removeItem("adminDetail");
  };
  checkLogin = async () => {
    this.setState({
      loder: true,
    });
    if (!this.state.username == "" && !this.state.password == "") {
      const login = this.state;
      const result = await postData3("/api/lead/admin", login);
      if (result.length == 1) {
        console.log(result);
        if (result[0].SuperAdmin === true) {
          sessionStorage.setItem("adminLogin", true);
          swal("You are Logged as SuperAdmin");
          this.props.history.push("/superhome");
        } else {
          sessionStorage.setItem("adminLogin", true);
          sessionStorage.setItem("adminDetail", JSON.stringify(result));
          swal("You are Logged as Admin");
          this.props.history.push("/adminhome");
        }
      } else {
        this.setState({ username: "", password: "" });
        swal(
          "Username & Password Not Match. Please Enter the Correct Username & Password"
        );
      }
    } else {
      swal("Please give right Admin Username and Password");
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
                <Col xs="8" lg="8"></Col>
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
                    <div className="fcv-heading">Admin Login</div>
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
                              this.setState({ username: e.target.value });
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
                              this.setState({ password: e.target.value });
                            }}
                          ></input>
                        </div>
                      </div>
                      {/* <div className="row mt-2 ">
                        <div className="col">
                          {" "}
                          <Link className="admin-link">
                            Forgotten password?{" "}
                          </Link>
                        </div>
                      </div> */}
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
      </Container>
    );
  }
}
