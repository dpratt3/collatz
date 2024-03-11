import "./App.css";
import React, { useState, useEffect } from "react";
import TimeSeriesPlot from "./timeSeriesPlot";
import { useLocation } from "react-router-dom"; // Import useLocation hook
import ReactGA from 'react-ga4';

const useQuery = () => new URLSearchParams(useLocation().search); // Custom hook to get query parameters

function App() {
  ReactGA.initialize('G-ND7GZGG49J');

  // Example event tracking
  ReactGA.event({
    action: 'page_view',
    category: 'Homepage',
    label: 'Visited Homepage'
  });

  const collatz = (num) => {
    let values = [num];
    while (num !== 1) {
      if (num % 2 === 0) num = num / 2;
      else num = 3 * num + 1;
      values.push(num);
    }
    return values;
  };

  useEffect(() => {
    document.title = "Collatz Conjecture";
  }, []);

  const query = useQuery();
  const defaultNumber = parseInt(query.get("number")) || 670617279;
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
    fetch(`/api/collatz/${num}`)
      .then(response => response.json())
      .then(data => {
        setSequence(data);
      })
      .catch(error => {
        console.error('Error:', error);
        setError("An error occurred while fetching the Collatz sequence.");
      });
    
    ReactGA.event({
      action: 'click',
      category: 'Button',
      label: 'Submit Button Clicked'
    });
  };

  
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleLogTrans = () => {
    setLogTrans(!logTrans);
    
    ReactGA.event({
      action: 'click',
      category: 'Button',
      label: 'Log Transform Button Clicked'
    });
  };

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
        </a>{" "}
        Visit <a href="https://www.midnightmechanism.com" style={{ color: "#4caf50" }}>Midnight Mechanism</a>.
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
