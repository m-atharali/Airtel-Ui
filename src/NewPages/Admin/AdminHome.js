import React from "react";
import {
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "reactstrap";
import { postData, postData3 } from "../../services/request";
import SideBar from "./SideBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet } from "@fortawesome/free-solid-svg-icons";
import NavBar from "./NavBar";
import swal from "sweetalert";

export default class MyAgent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedin: false,
      loader: false,
      setShow: true,
      modal: false,
      modal2: false,
      name: "",
      username: "",
      password: "",
      repaswd: "",
      allAgents: [],
      allCount: [],
      totalCount: "",
      remaing: "",
      APILIMIT: "",
      AdminName: "",
      newAgentList: [],
    };
  }
  componentDidMount = async () => {
    let login = sessionStorage.getItem("adminLogin");
    if (login != "true") {
      this.props.history.push("/admin");
    } else {
      let name = await sessionStorage.getItem("adminDetail");
      let Name = JSON.parse(name);
      this.setState({
        AdminName: Name[0].Name,
        APILIMIT: Name[0].Limit,
      });
      const count = await postData("get-identity", {
        AdminName: this.state.AdminName,
      });
      console.log(count);
      this.setState({
        allCount: count,
      });
      let totalHit = 0;
      for (let b = 0; b < count.length; b++) {
        totalHit = totalHit + parseInt(count[b].count);
      }
      console.log(totalHit);
      this.setState({
        totalCount: totalHit,
        remaing: this.state.APILIMIT - totalHit,
      });

      const agents = await postData3("/api/lead/agents", {
        AdminName: this.state.AdminName,
      });
      console.log(agents);
      this.setState({
        allAgents: agents,
        newAgentList: agents.sort(function (a, b) {
          var nameA = a.Name.toLowerCase(),
            nameB = b.Name.toLowerCase();
          if (nameA < nameB)
            //sort string ascending
            return -1;
          if (nameA > nameB) return 1;
          return 0; //default return value (no sorting)
        }),
      });
    }
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  nextPage = (name) => {
    console.log(name);
    sessionStorage.setItem("name", name);
    this.props.history.push("/agent");
  };

  addAgent = async () => {
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
          AdminName: this.state.AdminName,
        };
        const result = await postData3("/api/lead/adduser", User);
        postData("add", {
          sequenceName: this.state.name,
          AdminName: this.state.AdminName,
          count: "0",
          limit: "0",
          apiType: "nin",
        });
        if (result.status == true) {
          this.setState({
            username: "",
            password: "",
            repaswd: "",
            name: "",
          });
          swal("You create a new user");
        } else {
          this.setState({
            username: "",
            password: "",
            repaswd: "",
            modal: !this.state.modal,
          });
          swal("Some error creating in a new user");
        }
        window.location.reload();
      }
    } else {
      swal("Please fill all the field");
    }
  };

  toggle2 = () => {
    this.setState({
      modal2: !this.state.modal2,
    });
  };
  nameSearch = (e) => {
    console.log(e);
    const name = this.state.allAgents;

    const getAgent = name.filter((f) => f.Name.toLowerCase().startsWith(e));
    this.setState({
      newAgentList: getAgent,
    });
  };
  render() {
    return (
      <Container fluid={true} className="container-edit ">
        <div className="row">
          <SideBar history={this.props.history} />
          <div className="col-11">
            <NavBar history={this.props.history} />
            {/* //.....My Agent....// */}

            <div className="row  justify-content-center mt-3 bc-f3 ">
              <div className="col-11  ">
                <div className="row ">
                  <div className="col-8 heading-admin text-capitalize">
                    Agent account management platform
                  </div>
                  <div className="col-1"></div>
                  <div className="col-1 pt-3 end-text">
                    <FontAwesomeIcon
                      icon={faWallet}
                      size="3x"
                      color="#293891"
                    />
                  </div>
                  <div className="col-2 pt-3">
                    <span className="admin-count">
                      Total Unit= {this.state.APILIMIT}
                      <br />
                      Used Unit= {this.state.totalCount}
                      <br />
                      Remaing Unit= {this.state.remaing}
                      {/* {this.state.remaing} / {this.state.APILIMIT} */}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="row pt-5 bc-f3 box-size">
              <div className="container-fluid">
                <div className="row justify-content-center ">
                  <div className="col-11 bc-ff">
                    <div className="row pt-3 ">
                      <div className="col-2">
                        <div className="add-agent ml-4" onClick={this.toggle}>
                          <div style={{ color: "white" }} className="">
                            Add Agent
                          </div>
                        </div>
                      </div>
                      <div className="col-1"></div>
                      <div className="col-2">
                        {/* <div className="ag-btn ">CVS</div> */}
                      </div>
                      <div className="col-2">
                        <div className="ag-btn add-agent">Print</div>
                      </div>
                      <div className="col-2">
                        {/* <div className="ag-btn ">PDF</div> */}
                      </div>
                      <div className="col-2">
                        <div>
                          <span>
                            <input
                              type="text"
                              className="form-control ml-4"
                              placeholder="Search"
                              onChange={(e) => {
                                this.nameSearch(e.target.value);
                              }}
                            ></input>
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="row justify-content-center mt-3 inner-box">
                      <div className="col-11">
                        <table className="table">
                          <thead className="boder-col">
                            <tr>
                              <th scope="col" className="">
                                #
                              </th>
                              <th scope="col" className="">
                                Agent Name
                              </th>
                              <th scope="col" className="">
                                View
                              </th>
                            </tr>
                          </thead>
                          {this.state.newAgentList.map((data, idx) => (
                            <tbody key={idx}>
                              <tr>
                                <td className="">{idx + 1}</td>
                                <td className="">{data.Name}</td>
                                <td className="">
                                  <div
                                    className="act-bt"
                                    onClick={() => {
                                      this.nextPage(data.Name);
                                    }}
                                  >
                                    View
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          ))}
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* .....Modal... */}
        <div>
          <Modal isOpen={this.state.modal} toggle={this.toggle} className="">
            <ModalHeader toggle={this.toggle} className="">
              Create an Agent
            </ModalHeader>
            <ModalBody>
              <div className="container-fluid">
                <div className="row justify-content-center">
                  <div className="col-11">
                    <div className="row ">
                      <label>Agent Name</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) => {
                          this.setState({
                            name: e.target.value,
                          });
                        }}
                        value={this.state.name}
                      ></input>
                    </div>
                    <div className="row ">
                      <label>Username</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) => {
                          this.setState({
                            username: e.target.value,
                          });
                        }}
                        value={this.state.username}
                      ></input>
                    </div>
                    <div className="row  mt-2">
                      <label>Password</label>
                      <input
                        type="password"
                        className="form-control"
                        onChange={(e) => {
                          this.setState({
                            password: e.target.value,
                          });
                        }}
                        value={this.state.password}
                      ></input>
                    </div>
                    <div className="row  mt-2">
                      <label>Retry Password</label>
                      <input
                        type="password"
                        className="form-control"
                        onChange={(e) => {
                          this.setState({
                            repaswd: e.target.value,
                          });
                        }}
                        value={this.state.repaswd}
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
                    <Button className="btn-modal1 " onClick={this.toggle}>
                      Cancel
                    </Button>
                  </div>
                  <div className="col-4">
                    <Button className="btn-modal2 " onClick={this.addAgent}>
                      Create Agent
                    </Button>{" "}
                  </div>
                </div>
              </div>
            </ModalFooter>
          </Modal>
        </div>
      </Container>
    );
  }
}
