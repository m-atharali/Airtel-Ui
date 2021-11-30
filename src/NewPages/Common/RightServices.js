import React from "react";
import { Container, Row, Col } from "reactstrap";
import "../../assets/Style/personal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { Redirect } from "react-router-dom";

var tab = require("../../assets/images/tabCombined.png");

export default class RightServices extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount = () => {
    const agentlogin = sessionStorage.getItem("agentLogin");
    if (agentlogin != "true") {
      this.props.history.push("/");
    }
  };
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
                  <span style={{ color: "#40d400" }}>Service Available</span>
                </p>
                <p className="info-span">
                  <FontAwesomeIcon icon={faCheck} color="#63a80a" size="xs" />{" "}
                  NIN Verification
                </p>
                {/* <p className="info-span">
                  <FontAwesomeIcon icon={faCheck} color="#63a80a" size="xs" />{" "}
                  BVN Verification
                </p>
                <p className="info-span">
                  <FontAwesomeIcon icon={faCheck} color="#63a80a" size="xs" />{" "}
                  TIN Verification
                </p>
                <p className="info-span">
                  <FontAwesomeIcon icon={faCheck} color="#63a80a" size="xs" />
                  CAC Verification
                </p>
                <p className="info-span">
                  <FontAwesomeIcon icon={faCheck} color="#63a80a" size="xs" />
                  Phone Verification
                </p>
                <p className="info-span">
                  <FontAwesomeIcon icon={faCheck} color="#63a80a" size="xs" />{" "}
                  International Passport Verification
                </p>
                <p className="info-span">
                  <FontAwesomeIcon icon={faCheck} color="#63a80a" size="xs" />{" "}
                  Driver's license Verification
                </p>
                <p className="info-span">
                  <FontAwesomeIcon icon={faCheck} color="#63a80a" size="xs" />{" "}
                  Finger Print Verification
                </p> */}
              </div>

              <img src={tab} alt="" className="tab-side" />
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}
