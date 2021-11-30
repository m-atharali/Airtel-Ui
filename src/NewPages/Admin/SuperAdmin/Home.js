import React from "react";
import {
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "reactstrap";
import { getData3, postData3 } from "../../../services/request";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet } from "@fortawesome/free-solid-svg-icons";

import swal from "sweetalert";

export default class SuperHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: false,
      setShow: true,
      modal: false,
      modal2: false,
      ID: "",
      addLimit: "",
      name: "",
      username: "",
      password: "",
      repaswd: "",
      apilimit: "",
      allAdmin: [],
      addbtn: false,
    };
  }
  componentDidMount = async () => {
    let login = sessionStorage.getItem("adminLogin");
    if (login != "true") {
      this.props.history.push("/admin");
    } else {
      const admin = await getData3("/api/lead/getadmin");
      console.log(admin.model);
      this.setState({
        allAdmin: admin.model,
      });
    }
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };
  toggle2 = () => {
    this.setState({
      modal2: !this.state.modal2,
    });
  };
  nextPage = (id) => {
    this.setState({
      ID: id,
    });
    this.toggle2();
  };
  addLimit = () => {
    this.setState({
      addbtn: true,
    });
    let limitset = {
      id: this.state.ID,
      limit: this.state.addLimit,
    };
    postData3("/api/lead/addlimit", limitset);
    setTimeout(function () {
      window.location.reload();
    }, 1000);
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
          Limit: this.state.apilimit,
        };
        const result = await postData3("/api/lead/adminadd", User);

        if (result.status == true) {
          this.setState({
            username: "",
            password: "",
            repaswd: "",
            name: "",
            apilimit: "",
          });
          swal("You create a new user");
        } else {
          this.setState({
            username: "",
            password: "",
            repaswd: "",
            apilimit: "",
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
  logout = () => {
    sessionStorage.removeItem("adminLogin");
    window.location.reload();
  };
  render() {
    return (
      <>
        <Container fluid={true} className="container-edit desktop">
          <div className="row  justify-content-center mt-3 bc-f3 ">
            <div className="col-11  ">
              <div className="row justify-content-between">
                <div className="col-8 heading-admin text-capitalize">
                  Admin account management platform
                </div>
                <div className="col-3 pt-3">
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={this.logout}
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="row pt-5 bc-f3 box-size">
            <div className="container-fluid">
              <div className="row justify-content-center">
                <div className="col-11 bc-ff">
                  <div className="row pt-3 justify-content-between">
                    <div className="col-2">
                      <div className="add-agent ml-4" onClick={this.toggle}>
                        <div style={{ color: "white" }} className="">
                          Add Admin
                        </div>
                      </div>
                    </div>
                    <div className="col-2">
                      <span>
                        <input
                          type="text"
                          className="form-control ml-4"
                          placeholder="Search"
                        ></input>
                      </span>
                    </div>
                    <div className="col-1"></div>
                  </div>

                  <div className="row justify-content-center mt-3">
                    <div className="col-11">
                      <table className="table">
                        <thead className="boder-col">
                          <tr>
                            <th scope="col" className="">
                              #
                            </th>
                            <th scope="col" className="">
                              Admin Name
                            </th>
                            <th scope="col" className="">
                              Package Unit
                            </th>
                            <th scope="col" className="">
                              Set Unit
                            </th>
                          </tr>
                        </thead>
                        {this.state.allAdmin.map((data, idx) => (
                          <tbody key={idx}>
                            {data.SuperAdmin === false && (
                              <tr>
                                <td className="">{idx + 1}</td>
                                <td className="">{data.Name}</td>
                                <td className="">{data.Limit}</td>
                                <td className="">
                                  <div
                                    className="act-bt"
                                    onClick={() => {
                                      this.nextPage(data._id);
                                    }}
                                  >
                                    Add
                                  </div>
                                </td>
                              </tr>
                            )}
                          </tbody>
                        ))}
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
        {/* .....Modal... */}
        <div>
          <Modal isOpen={this.state.modal} toggle={this.toggle} className="">
            <ModalHeader toggle={this.toggle} className="">
              Create an Admin
            </ModalHeader>
            <ModalBody>
              <div className="container-fluid">
                <div className="row justify-content-center">
                  <div className="col-11">
                    <div className="row ">
                      <label>Admin Name</label>
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
                    <div className="row  mt-2">
                      <label>Unit</label>
                      <input
                        type="number"
                        className="form-control"
                        onChange={(e) => {
                          this.setState({
                            apilimit: e.target.value,
                          });
                        }}
                        value={this.state.apilimit}
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
                      Create Admin
                    </Button>{" "}
                  </div>
                </div>
              </div>
            </ModalFooter>
          </Modal>
        </div>
        <div>
          <Modal isOpen={this.state.modal2} toggle={this.toggle2} className="">
            <ModalHeader toggle={this.toggle2} className="">
              Add Package Unit
            </ModalHeader>
            <ModalBody>
              <div className="container-fluid">
                <div className="row justify-content-center">
                  <div className="col-11">
                    <div className="row ">
                      <label>Package Unit </label>

                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) => {
                          this.setState({
                            addLimit: e.target.value,
                          });
                        }}
                        value={this.state.addLimit}
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
                    <Button className="cancle-bt" onClick={this.toggle2}>
                      Cancel
                    </Button>
                  </div>
                  <div className="col-4">
                    {this.state.addbtn === false && (
                      <Button className="act-bt" onClick={this.addLimit}>
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
