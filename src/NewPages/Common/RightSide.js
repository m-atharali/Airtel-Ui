import React from "react";
import { Container, Row, Col } from "reactstrap";
import "../../assets/Style/personal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { Redirect } from "react-router-dom";

var tab = require("../../assets/images/tabCombined.png");

export default class RightSide extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Container fluid={true} className="container-edit">
        <Row>
          <Col>
            <div className="sidebox d-none d-sm-block pt-5">
              <br />
              <div
                style={{
                  textAlign: "left",
                  margin: "auto",
                  top: "100px",
                  width: "450px",
                  color: "white",
                  fontSize: "22px",
                }}
              >
                <p className="info-span">
                  <span style={{ color: "#40d400" }}>Verification</span> in{" "}
                  <span style={{ color: "#40d400" }}>4</span> easy steps
                </p>
                <p className="info-span">
                  <FontAwesomeIcon icon={faCheck} color="#63a80a" size="xs" />{" "}
                  Login as a registered Agent
                </p>
                <p className="info-span">
                  <FontAwesomeIcon icon={faCheck} color="#63a80a" size="xs" />{" "}
                  Select Type of Service
                </p>
                <p className="info-span">
                  <FontAwesomeIcon icon={faCheck} color="#63a80a" size="xs" />{" "}
                  Result of User
                </p>
                <p className="info-span">
                  {" "}
                  <FontAwesomeIcon
                    icon={faCheck}
                    color="#63a80a"
                    size="xs"
                  />{" "}
                  Print
                </p>
              </div>
              <br />
              <br />
              <img src={tab} alt="" className="tab-side" />
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}
