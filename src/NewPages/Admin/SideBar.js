import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

var image1 = require("./images/Image01.png");
var image2 = require("./images/Image02.png");
var image3 = require("./images/Image03.png");
var image4 = require("./images/Image04.png");
var image5 = require("./images/Image05.png");

export default class SideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedin: false,
      loader: false,
    };
  }

  render() {
    return (
      <>
        <div className="col-1 bc-28 text-center" style={{ height: "100vh" }}>
          {/* <div className="mt-2">
            <a className="nav-link">
              <img
                src={image1}
                className="p-2 mr-2 mt-2"
                style={{ width: "60px" }}
              />
            </a>
          </div> */}
          {/* <div className="mt-2">
            <a className="nav-link">
              <img
                src={image2}
                className="p-2 mr-2 mt-2"
                style={{ width: "60px" }}
              />
            </a>
          </div> */}
          <div className="mt-2">
            <Link className="" to="/adminhome">
              <img
                src={image3}
                className="p-2 mr-2 mt-2"
                style={{ width: "60px" }}
              />
            </Link>
          </div>
          <div className="mt-2">
            <Link className="" to="/report">
              <img
                src={image4}
                className="p-2 mr-2 mt-2"
                style={{ width: "60px" }}
              />
            </Link>
          </div>
          <div className="arrow-back">
            <Link className="" to="/admin">
              <img
                src={image5}
                className="p-2 mr-2 mt-2"
                style={{ width: "60px" }}
              />
            </Link>
          </div>
        </div>
      </>
    );
  }
}
