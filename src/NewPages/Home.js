import React from "react";
import { Container, Row, Col } from "reactstrap";
import "../assets/Style/personal.css";
import { Redirect } from "react-router-dom";
import Bottom from "./Common/Bottom";

var link = require("../assets/Lead-images/Afritech-logo.png");

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    if (this.state.loggedin === true) {
      return <Redirect to="/" />;
    }
    return (
      <Container fluid={true} className="container-edit">
        <Row noGutters={true}>
          <Col md="12" className="column-edit">
            <br />
            <Container>
              <Row className="justify-content-center">
                <Col lg="8" xs="12" className="text-center">
                  <div className="fcv-heading">
                    Welcome to Leadway Verification Platform.
                  </div>
                </Col>
                <Col lg="7">
                  <Row
                    style={{ padding: "20px" }}
                    className="justify-content-center"
                  >
                    <Col lg="6">
                      <img
                        src={link}
                        alt=""
                        style={{
                          marginLeft: "auto",
                          marginRight: "auto",
                          display: "block",
                          width: "100%",
                        }}
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>

              <Row className="justify-content-center">
                <Col lg="3">
                  <div className="row mt-5">
                    <div className="col">
                      <button
                        className="btn btn-bio"
                        onClick={() => {
                          this.props.history.push("/login");
                        }}
                      >
                        Proceed
                      </button>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
            {/* </div> */}
          </Col>
        </Row>
        <Row>
          <Bottom />
        </Row>
      </Container>
    );
  }
}
