import React, { useEffect } from "react";
import Plotly from "plotly.js/lib/core";

const countingArr = (length) => {
  let arr = [];
  for (let i = 1; i <= length; i += 1) {
    arr.push(i);
  }
  return arr;
};

const TimeSeriesPlot = ({ yValues }) => {
  const formatVal = (val) =>
    val.toLocaleString(undefined, { minimumFractionDigits: 0 });

  useEffect(() => {
    const xArr = countingArr(yValues.length);
    const data = [
      {
        x: xArr,
        y: yValues,
        type: "scatter",
        line: {
          color: "#FFFFFF",
        },
      },
    ];

    const layout = {
      title: {
        text: "Trajectory for " + formatVal(yValues[0]),
        font: {
          color: "#D3D3D3",
        },
      },
      xaxis: {
        title: "Step",
        color: "#FFFFFF",
        gridcolor: "#FFFFFF", // Gridlines color
      },
      yaxis: {
        title: "Value",
        color: "#FFFFFF",
        gridcolor: "#FFFFFF", // Gridlines color
      },
      plot_bgcolor: "rgba(0, 0, 0, 0)", // Transparent plot background
      paper_bgcolor: "rgba(0, 0, 0, 0.7)", // Semi-transparent paper background
    };

    const config = {
      responsive: true, // Make the plot responsive
    };

    Plotly.newPlot("myDiv", data, layout, config);
  }, [yValues]);

  return <div id="myDiv" />;
};

export default TimeSeriesPlot;
