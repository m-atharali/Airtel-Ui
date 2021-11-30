import React from "react";
import { Row, Col, Container } from "reactstrap";
import Fade from "react-reveal/Fade";
import RightSide from "./Common/RightServices";
import Bottom from "./Common/Bottom";
var link = require("../assets/Lead-images/Afritech-logo.png");

class WelcomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      surName: "",
    };
  }

  componentDidMount = async () => {
    const getName = await sessionStorage.getItem("agent");
    const data = JSON.parse(getName);
    this.setState({
      name: data && data.Name ? data.Name : "",
    });
  };
  logout = () => {
    sessionStorage.removeItem("agentLogin");
    window.location.reload();
  };
  render() {
    return (
      <>
        <Container fluid={true} className="container-edit">
          <Fade right>
            <Row noGutters={true}>
              <Col md="5">
                <RightSide history={this.props.history} />
              </Col>

              <Col md="7" className="column-edit">
                <div
                  style={{
                    height: "100vh",
                    overflowY: "auto",
                    overflowX: "hidden",
                  }}
                >
                  <Row className="justify-content-between">
                    <div className="col-3 pt-3">
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
                    </div>
                    <div className="col-2 mt-2">
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={this.logout}
                      >
                        Logout
                      </button>
                    </div>
                  </Row>

                  <br />
                  <div className="container-fluid desktop">
                    <Row></Row>
                    <Row className="justify-content-center">
                      <div className="col-10 mb-5 text-center">
                        <div className="head1 fz-36">
                          Welcome
                          <span className="head fz-36">,{this.state.name}</span>
                        </div>
                        <div className="sub-head mt-3">
                          You are now logged into Leadway identity Verification
                          Platform
                        </div>
                        <div className="sub-head">
                          Please proceed to complete the process
                        </div>

                        <div
                          className="btn btn-form mt-4"
                          onClick={() => {
                            this.props.history.push("/nin");
                          }}
                        >
                          Proceed{" "}
                        </div>
                      </div>
                    </Row>
                    <Row>
                      <Bottom />
                    </Row>
                  </div>
                </div>
              </Col>
            </Row>
          </Fade>
        </Container>
      </>
    );
  }
}

export default WelcomePage;
