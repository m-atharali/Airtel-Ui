import React from "react";
import "../../App.css";

export default class Bottom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="bottom-text">
        Powered by{" "}
        {/* <a href="https://idverify.com.ng" style={{ fontWeight: "bold" }}> */}
        Afritech
        {/* </a> */}
      </div>
    );
  }
}
