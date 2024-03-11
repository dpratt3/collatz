import React, { useEffect } from "react";
import Plotly from "plotly.js/lib/core";

const countingArr = (length) => {
  let arr = [];
  for (let i = 1; i <= length; i += 1) {
    arr.push(i);
  }
  return arr;
};

const TimeSeriesPlot = ({ yValues, logBool }) => {
  const formatVal = (val) =>
    val.toLocaleString(undefined, { minimumFractionDigits: 0 });

  useEffect(() => {
    // allow for log transform
    let logTransY;
    let logTransTitle;
    let yTitle;

    if (logBool) {
      logTransY = yValues.map((y) => Math.log(y));
      logTransTitle = "Log Trajectory for " + formatVal(yValues[0]);
      yTitle = "Log(Value)";
    } else {
      logTransY = yValues;
      logTransTitle = "Trajectory for " + formatVal(yValues[0]);
      yTitle = "Value";
    }

    const xArr = countingArr(yValues.length);
    const data = [
      {
        x: xArr,
        y: logTransY,
        type: "scatter",
        line: {
          color: "rgba(215, 137, 10, 1)",
          width: 3,
        },
      },
    ];

    const layout = {
      title: {
        text: logTransTitle,
        font: {
          color: "#FFFFFF",
          weight: "bold",
        },
        // Wrap the title text
        xref: "paper",
        x: 0.5,
        xanchor: "center",
        yanchor: "top",
        wraplength: 200,
      },
      xaxis: {
        title: "Step",
        color: "#FFFFFF",
        tickfont: {
          family: "Arial, sans-serif",
          size: 12,
          color: "#FFFFFF",
        },
        tickcolor: "#FFFFFF", // Set tick color to white
        gridcolor: "#FFFFFF",
        gridwidth: 0.25, // Increase grid width for better visibility
      },
      yaxis: {
        title: yTitle,
        color: "#FFFFFF",
        tickfont: {
          family: "Arial, sans-serif",
          size: 12,
          color: "#FFFFFFF",
        },
        tickcolor: "#FFFFFF", // Set tick color to white
        gridcolor: "#FFFFFF",
        gridwidth: 0.25, // Increase grid width for better visibility
      },
      plot_bgcolor: "rgba(0, 0, 0, 0)",
      paper_bgcolor: "rgba(0, 0, 0, 0.7)",
    };

    const config = {
      responsive: true,
      displaylogo: false,
      modeBarButtonsToRemove: [
        "sendDataToCloud",
        "pan2d",
        "select2d",
        "lasso2d",
        "zoomIn2d",
        "zoomOut2d",
        "autoScale2d",
        "resetScale2d",
        "hoverClosestCartesian",
        "hoverCompareCartesian",
        "toggleSpikelines",
      ],
    };

    Plotly.newPlot("myDiv", data, layout, config);
  }, [yValues, logBool]);

  return <div id="myDiv" />;
};

export default TimeSeriesPlot;
