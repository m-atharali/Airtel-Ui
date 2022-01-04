import React from "react";
import "../../App.css";

export default class Loader extends React.Component {
  render() {
    return (
      <>
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-2">
              <div class="loader-container">
                <div class="loader"></div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
