import React from "react";
import { Container, Row, Col } from "reactstrap";
import "../../assets/Style/personal.css";

var link = require("../../assets/airtel-images/logo.png");

export default class Right2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Container fluid={true} className="container-edit">
        <Row>
          <Col>
            <div className="sidebox d-none d-sm-block">
              <div className="d-none d-sm-block pt-5">
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
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
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}
