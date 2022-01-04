import React, { Component } from "react";
import CanvasJSReact from "./../asset/canvasjs.react";
import { Container } from "reactstrap";
import { postData, getData } from "../../services/request";
import TotalCount from "./SWRData";
import Loader from "../Common/Loader";

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class MyAgent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lodding: false,
      error: false,
      data: [],
      startDate: "",
      endDate: "",
      response: "",
      drop: "",
      persantage: "",
      totalHits: "",
      responseCount: "",
      dropCount: "",
      chart: false,
    };
  }

  getChart = async () => {
    this.setState({
      lodding: true,
    });
    const report = {
      sdate: this.state.startDate,
      edate: this.state.endDate,
    };
    console.log(report);

    const result = await postData("facial-recognition/report", report);
    console.log(result);
    const totalLength = result.length;
    const responseArray = [];
    const dropArray = [];
    for (let a = 0; a < totalLength; a++) {
      if (result[a].Response == true) {
        responseArray.push(result[a]);
      } else {
        dropArray.push(result[a]);
      }
    }
    console.log(responseArray);
    console.log(dropArray);
    this.setState({
      chart: true,
      totalHits: totalLength,
      response: (responseArray.length / totalLength) * 100,
      drop: (dropArray.length / totalLength) * 100,
      responseCount: responseArray.length,
      dropCount: dropArray.length,
    });
    this.setState({
      lodding: false,
      error: true,
    });
  };

  render() {
    const options = {
      animationEnabled: true,
      title: {
        text: "Customer Satisfaction",
      },
      subtitles: [
        {
          text: parseInt(this.state.response) + "Positive",
          verticalAlign: "center",
          fontSize: 24,
          dockInsidePlotArea: true,
        },
      ],
      data: [
        {
          type: "doughnut",
          showInLegend: true,
          indexLabel: "{name}: {y}",
          yValueFormatString: "#,###'%'",
          dataPoints: [
            { name: "Response", y: this.state.response },
            { name: "Drop", y: this.state.drop },
          ],
        },
      ],
    };

    return (
      <Container fluid={true} className="container-edit ">
        <div className="row mt-2">
          <div className="col-12 col-sm-8">
            <div className="row">
              <div className="col-4 ml-2">
                <label>Start Date</label>
                <input
                  type="date"
                  className="form-control"
                  onChange={(e) =>
                    this.setState({
                      startDate: e.target.value,
                    })
                  }
                  value={this.state.startDate}
                ></input>
              </div>
              <div className="col-4">
                <label>End Date</label>
                <input
                  type="date"
                  className="form-control"
                  onChange={(e) =>
                    this.setState({
                      endDate: e.target.value,
                    })
                  }
                  value={this.state.endDate}
                ></input>
              </div>
              <div className="col-3">
                <div
                  className="btn btn-primary"
                  style={{ marginTop: "30px" }}
                  onClick={this.getChart}
                >
                  Get
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-4 count-show">
            <TotalCount />
          </div>
        </div>
        {this.state.lodding === true ? (
          <Loader />
        ) : (
          <>
            <div className="row mt-3">
              {this.state.chart === true && <CanvasJSChart options={options} />}
            </div>
            <div className="row mt-2 text-center fs-22 fw-bold bo-top">
              <div className="col-12 col-sm-4">
                <div className="row">
                  <div className="col-12 ">Date</div>
                </div>
                <div className="row">
                  <div className="col-6">
                    From <br /> {this.state.startDate}
                  </div>
                  <div className="col-6">
                    To <br /> {this.state.endDate}
                  </div>
                </div>
              </div>
              <div className="col-4 col-sm-2 mt-4">
                Total Hits <br /> {this.state.totalHits}
              </div>
              <div className="col-4 col-sm-2 mt-4">
                Success <br /> {this.state.responseCount}
              </div>
              <div className="col-4 col-sm-2 mt-4">
                Drop <br /> {this.state.dropCount}
              </div>
            </div>
          </>
        )}
      </Container>
    );
  }
}
