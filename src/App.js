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

  const handleCollatz = () => {
    const num = Number(inputValue);
    if (num % 1 !== 0 || num < 1 || typeof num !== "number") {
      setError("Invalid entry. Please enter an integer > 0");
      return;
    }
    setError("");
    setSequence(collatz(num));
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div>
      <h1>Collatz Conjecture!</h1>
      <h3>Please enter an integer greater than 0.</h3>
      <input
        type="number"
        value={inputValue}
        onChange={handleInputChange}
        min="1"
      />
      <button onClick={handleCollatz}>Submit</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <TimeSeriesPlot
          key={sequence.toString()}
          yValues={sequence}
          value={inputValue}
        />
      </div>

      <div>{sequence.join(", ")}</div>
    </div>
  );
}

export default App;
