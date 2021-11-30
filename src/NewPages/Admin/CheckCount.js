import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { getAuth } from "../../services/request";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons";

var link = require("../../assets/white-images/link.png");
var pay = require("../../assets/white-images/payvision.png");

export default class CheckCount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      table: [],
    };
  }

  componentDidMount = async () => {
    const result = await getAuth("/all");
    console.log(result.data.model);
    this.setState({
      table: result.data.model,
    });
  };

  render() {
    return (
      <Container fluid={true} className="container-edit">
        <Row>
          <Col xs="4" lg="4" className="mt-2 ml-2">
            <Link to="/adminhome">
              <FontAwesomeIcon
                icon={faChevronCircleLeft}
                size="3x"
                color="#04478a"
              />
            </Link>
          </Col>
          <Col lg="3" className="desktop">
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
            <img
              src={pay}
              alt=""
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                display: "block",
                width: "110px",
              }}
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
        <Row className="mt-5">
          <div
            className="col-12"
            style={{
              maxHeight: "90vh",
              overflowY: "auto",
              maxWidth: "100%",
              overflowX: "auto",
            }}
          >
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Api Type</th>
                  <th scope="col">Limit</th>
                  <th scope="col">Total Count</th>
                </tr>
              </thead>
              {this.state.table.map((data, idx) => (
                <tbody key={idx}>
                  <tr>
                    <th scope="row">{idx + 1}</th>
                    {data.apiType == "nin" && <td>NIN</td>}
                    {data.apiType == "tin" && <td>TIN</td>}
                    {data.apiType == "bvn" && <td>BVN</td>}
                    {data.apiType == "ip" && <td>International Passport</td>}
                    {data.apiType == "tel" && <td>Phone</td>}
                    <td>{data.limit}</td>
                    <td>{data.count} </td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        </Row>
        <Row className="justify-content-center mt-5">
          <div className="bottom-text">
            Powered by{" "}
            <a href="https://idverify.com.ng" style={{ fontWeight: "bold" }}>
              Afritech
            </a>
          </div>
        </Row>
      </Container>
    );
  }
}
