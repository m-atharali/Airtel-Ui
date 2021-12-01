// import React from "react";

// class Test extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {};
//   }

//   componentDidMount = () => {};

//   render() {
//     return (
//       <>
//         <div className="container-fluid">
//           <div className="row">there</div>
//         </div>
//       </>
//     );
//   }
// }

// export default Test;
import React, { Component } from "react";
import CanvasJSReact from "./asset/canvasjs.react";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Test extends Component {
  render() {
    const options = {
      animationEnabled: true,
      title: {
        text: "Customer Satisfaction",
      },
      subtitles: [
        {
          text: "99% Positive",
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
            { name: "Response", y: 99 },
            { name: "Drop", y: 1 },
            // { name: "Very Satisfied", y: 95 },
            // { name: "Satisfied", y: 95 },
            // { name: "Neutral", y: 7 },
          ],
        },
      ],
    };

    return (
      <div className="mt-3">
        <CanvasJSChart
          options={options}
          /* onRef={ref => this.chart = ref} */
        />
        {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
      </div>
    );
  }
}

export default Test;
