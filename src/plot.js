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
  useEffect(() => {
    const xArr = countingArr(yValues.length);
    const data = [
      {
        x: xArr,
        y: yValues,
        type: "scatter",
      },
    ];

    Plotly.newPlot("myDiv", data);
  }, []);

  return <div id="myDiv" />;
};

export default TimeSeriesPlot;
