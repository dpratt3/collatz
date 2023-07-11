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
          color: ["rgba(255, 165, 0, 1)"],
          width: 2,
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
        tickfont: {
          family: "Arial, sans-serif",
          size: 12,
          color: "rgba(221, 221, 221, 0.7)",
        },
        tickcolor: "#FFFFFF", // Set tick color to white
      },
      yaxis: {
        title: "Value",
        color: "#FFFFFF",
        tickfont: {
          family: "Arial, sans-serif",
          size: 12,
          color: "rgba(221, 221, 221, 0.7)",
        },
        tickcolor: "#FFFFFF", // Set tick color to white
      },
      plot_bgcolor: "rgba(0, 0, 0, 0)",
      paper_bgcolor: "rgba(0, 0, 0, 0.7)",
      xaxis: {
        gridcolor: "#FFFFFF",
        gridwidth: 1, // Increase grid width for better visibility
      },
      yaxis: {
        gridcolor: "#FFFFFF",
        gridwidth: 1, // Increase grid width for better visibility
      },
    };

    const config = {
      responsive: true,
    };

    Plotly.newPlot("myDiv", data, layout, config);
  }, []);

  return <div id="myDiv" />;
};

export default TimeSeriesPlot;
