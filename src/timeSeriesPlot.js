import React, { useEffect } from "react";
import Plotly from "plotly.js/lib/core";

const countingArr = (length) => {
  let arr = [];
  for (let i = 1; i <= length; i += 1) {
    arr.push(i);
  }
  return arr;
};

const TimeSeriesPlot = ({ yValues, value }) => {
  useEffect(() => {
    const xArr = countingArr(yValues.length);
    const data = [
      {
        x: xArr,
        y: yValues,
        type: "scatter",
      },
    ];

    // make value in question human readable
    const formatVal = (val) =>
      val.toLocaleString(undefined, { minimumFractionDigits: 0 });

    const layout = {
      title: "Trajectory for " + formatVal(yValues[0]),
      xaxis: {
        title: "Step",
      },
      yaxis: {
        title: "Value",
      },
    };

    // make graph responsive
    var config = { responsive: true };

    Plotly.newPlot("myDiv", data, layout, config);
  }, []);

  return <div id="myDiv" />;
};

export default TimeSeriesPlot;
