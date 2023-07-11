import "./App.css";
import React, { useState } from "react";
import TimeSeriesPlot from "./timeSeriesPlot";

function App() {
  const collatz = (num) => {
    let values = [num];
    while (num !== 1) {
      if (num % 2 === 0) num = num / 2;
      else num = 3 * num + 1;
      values.push(num);
    }
    return values;
  };

  const defaultNumber = 113383;
  const [inputValue, setInputValue] = useState(defaultNumber);
  const [sequence, setSequence] = useState(collatz(defaultNumber));
  const [error, setError] = useState("");
  const [logTrans, setLogTrans] = useState(false);

  // format values in final sequence
  const formatVal = (val) =>
    val.toLocaleString(undefined, { minimumFractionDigits: 0 });

  const handleCollatz = () => {
    const num = Number(inputValue.toString().replaceAll(",", ""));

    if (
      num % 1 !== 0 ||
      num < 1 ||
      typeof num !== "number" ||
      num > Number.MAX_SAFE_INTEGER
    ) {
      setError(
        "Invalid entry. Please enter an integer between 0 and " +
          formatVal(Number.MAX_SAFE_INTEGER) +
          "."
      );
      return;
    }
    setError("");
    setSequence(collatz(num));
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleLogTrans = () => setLogTrans(!logTrans);

  return (
    <div>
      {/* The following stars are from: https://codepen.io/riley-pearce/pen/OJWPjZM */}
      <div class="bg-animation">
        <div id="stars"></div>
        <div id="stars2"></div>
        <div id="stars3"></div>
        <div id="stars4"></div>
      </div>
      <h1>Collatz Conjecture!</h1>
      <h4>
        Please enter an integer between 0 and 9,007,199,254,740,992.
        {/* Add an empty space to the hyperlink that's not hyperlinked*/}
        <span style={{ textDecoration: "none" }}> </span>{" "}
        <a
          href="https://en.wikipedia.org/wiki/Collatz_conjecture"
          style={{ color: "#4caf50" }}
        >
          Learn more.
        </a>
      </h4>
      <input
        type="string"
        value={inputValue}
        onChange={handleInputChange}
        min="1"
      />
      <button onClick={handleCollatz}>Submit</button>
      <button
        className={logTrans ? "red-button" : "button"}
        onClick={handleLogTrans}
      >
        Log Transform
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div style={{ opacity: 0.95 }}>
        <TimeSeriesPlot
          key={sequence.toString()}
          yValues={sequence}
          value={inputValue}
          logBool={logTrans}
        />
      </div>
      {/* show sequence of numbers  */}
      <div style={{ color: "rgba(215, 137, 10, 1)" }}>
        {!logTrans && sequence.map((y) => formatVal(y)).join(" → ")}
        {logTrans && sequence.map((y) => formatVal(Math.log(y))).join(" → ")}
      </div>
    </div>
  );
}

export default App;
