import React from "react";
import { Container, Row, Col } from "reactstrap";
import { BrowserRouter as Router, NavLink } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import "../../assets/Style/personal.css";
// import "./Admin.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleRight,
  faCaretDown,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
var link = require("../../assets/Lead-images/Afritech-logo.png");

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      AdminName: "",
    };
  }

  componentDidMount = () => {
    // let login = sessionStorage.getItem("adminLogin");
    // if (login != "true") {
    //   this.props.history.push("/admin");
    // } else {
    //   let name = sessionStorage.getItem("adminDetail");
    //   let Name = JSON.parse(name);
    //   this.setState({
    //     AdminName: Name[0].Name,
    //   });
    // }
  };

  render() {
    return (
      <>
        <div
          className="row justify-content-between"
          style={{ backgroundColor: "white" }}
        >
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
          <div className="col-6">
            <div className="row mt-4">
              <span>
                <NavLink
                  to="/adminhome"
                  className="nav-link ml-2"
                  activeclassname="active"
                >
                  My Agents
                </NavLink>
              </span>

              <span>
                <NavLink
                  to="/report"
                  className="nav-link ml-2"
                  activeclassname="active"
                >
                  Reports
                </NavLink>
              </span>

              <span className="head-link ml-5">
                <Dropdown>
                  <Dropdown.Toggle>
                    <FontAwesomeIcon
                      icon={faUserCircle}
                      size="2x"
                      color="#FFFFFF"
                    />
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">
                      Hello {this.state.AdminName}
                    </Dropdown.Item>

                    <Dropdown.Item href="/admin">Log Out</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </span>
            </div>
          </div>
        </div>
      </>
    );
  }
}
