import React, { Component } from "react";
import CanvasJSReact from "./../asset/canvasjs.react";
import { Container } from "reactstrap";
import { postData } from "../../services/request";
import moment from "moment-mini";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class MyAgent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      startDate: "",
      endDate: "",
      response: "99",
      drop: "1",
      persantage: "99",
    };
  }
  componentDidMount = () => {};
  getChart = async () => {
    const report = {
      sdate: this.state.startDate,
      edate: moment().endOf(this.state.endDate),
    };
    console.log(this.state);

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
      response: (responseArray.length / totalLength) * 100,
      drop: (dropArray.length / totalLength) * 100,
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
          <div className="col-2 ml-2">
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
          <div className="col-2">
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
          <div className="col-2">
            <div
              className="btn btn-primary"
              style={{ marginTop: "30px" }}
              onClick={this.getChart}
            >
              Get
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <CanvasJSChart
            options={options}
            /* onRef={ref => this.chart = ref} */
          />
        </div>
      </Container>
    );
  }
}
