import React, { useEffect } from "react";
import Plotly from "plotly";

const TimeSeriesPlot = () => {
  useEffect(() => {
    const data = [
      {
        x: [
          "2013-10-04 22:23:00",
          "2013-11-04 22:23:00",
          "2013-12-04 22:23:00",
        ],
        y: [1, 3, 6],
        type: "scatter",
      },
    ];

    Plotly.newPlot("myDiv", data);
  }, []);

  return <div id="myDiv" />;
};

export default TimeSeriesPlot;
