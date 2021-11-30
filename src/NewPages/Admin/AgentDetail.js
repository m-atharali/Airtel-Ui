import React from "react";
import {
  Container,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "reactstrap";
import { Link } from "react-router-dom";
import { postData, getAuth } from "../../services/request";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartPie,
  faChevronCircleLeft,
} from "@fortawesome/free-solid-svg-icons";
import { post } from "jquery";
import Bottom from "../Common/Bottom";

var link = require("../../assets/Lead-images/Afritech-logo.png");

export default class AgentDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addbtn: false,
      ninNo: "",
      bvnNo: "",
      tinNo: "",
      telNo: "",
      ipNo: "",
      table: [],
      type: "",
      id: "",
      limit: "",
      all: [],
      remaing: "",
      setLimit: "",
      APILIMIT: "",
      AdminName: "",
    };
  }

  componentDidMount = async () => {
    let name = await sessionStorage.getItem("adminDetail");
    let Name = JSON.parse(name);
    this.setState({
      AdminName: Name[0].Name,
      APILIMIT: Name[0].Limit,
    });
    const count = await postData("get-identity", {
      AdminName: this.state.AdminName,
    });
    this.setState({
      all: count,
    });
    let totalLimit = 0;
    for (let b = 0; b < count.length; b++) {
      totalLimit = totalLimit + parseInt(count[b].limit);
    }
    console.log(totalLimit);
    this.setState({
      setLimit: totalLimit,
      remaing: this.state.APILIMIT - totalLimit,
    });
    const agentName = sessionStorage.getItem("name");

    let sendName = { agentName: agentName };
    const result = await postData("agentDetail", sendName);
    console.log(result);
    this.setState({
      table: result,
    });
  };
  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };
  nextPage = (a, b) => {
    this.setState({
      type: a,
      id: b,
    });
    this.toggle();
  };
  addLimit = () => {
    this.setState({
      addbtn: true,
    });
    if (this.state.remaing - this.state.limit <= 0) {
      alert("Your have no limit");
    } else {
      let setLimit = {
        limit: this.state.limit,
        id: this.state.id,
      };
      postData("apilimit", setLimit);
      setTimeout(function () {
        window.location.reload();
      }, 1000);
    }
  };
  render() {
    return (
      <>
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
            <Col lg="4" className="pt-3">
              <img
                src={link}
                alt=""
                style={{
                  marginLeft: "auto",
                  marginRight: "auto",
                  display: "block",
                  width: "150px",
                }}
              />
            </Col>
            <div className="col-1 mt-3 end-text">
              <span>
                <FontAwesomeIcon icon={faChartPie} size="3x" color="#04478a" />
              </span>
            </div>
            <div className="col-2 mt-3">
              <span className="admin-count">
                Total Limit= {this.state.APILIMIT}
                <br />
                Used Limit= {this.state.setLimit}
                <br />
                Remaing Limit= {this.state.remaing}
                {/* {this.state.remaing} / {this.state.APILIMIT} */}
              </span>
            </div>
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
                    {/* <th scope="col">Add Limit</th> */}
                    <th scope="col">Set Limit</th>
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

                      <td>
                        <div
                          className="act-bt"
                          onClick={() => {
                            this.nextPage(data.apiType, data._id);
                          }}
                        >
                          Add
                        </div>
                      </td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </div>
          </Row>
          <Row>
            <Bottom />
          </Row>
        </Container>
        <div>
          <Modal isOpen={this.state.modal} toggle={this.toggle} className="">
            <ModalHeader toggle={this.toggle} className="">
              Set Limit
            </ModalHeader>
            <ModalBody>
              <div className="container-fluid">
                <div className="row justify-content-center">
                  <div className="col-11">
                    <div className="row ">
                      {this.state.type === "nin" && <label>NIN</label>}
                      {this.state.type === "bvn" && <label>BVN</label>}
                      {this.state.type === "tin" && <label>TIN</label>}
                      {this.state.type === "tel" && <label>Phone</label>}
                      {this.state.type === "ip" && (
                        <label>International Passport</label>
                      )}
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) => {
                          this.setState({
                            limit: e.target.value,
                          });
                        }}
                        value={this.state.limit}
                      ></input>
                    </div>
                  </div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <div className="container-fluid">
                <div className="row justify-content-between">
                  <div className="col-4">
                    <Button className="cancle-bt " onClick={this.toggle}>
                      Cancel
                    </Button>
                  </div>
                  <div className="col-4">
                    {this.state.addbtn === false && (
                      <Button className="act-bt " onClick={this.addLimit}>
                        Add
                      </Button>
                    )}
                    {this.state.addbtn === true && (
                      <Button className="act-bt " disabled="true">
                        Add
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </ModalFooter>
          </Modal>
        </div>
      </>
    );
  }
}
