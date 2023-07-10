import "./App.css";
import React, { useState } from "react";
import TimeSeriesPlot from "./plot";

function App() {
  // this is the function from the famous Collatz conjecture
  const collatz = (num) => {
    let values = [num];
    while (num !== 1) {
      if (num % 2 === 0) num = num / 2;
      else num = 3 * num + 1;
      values.push(num);
    }

    // allow collatz function to run before setSequence is defined
    try {
      setSequence(values);
    } catch (error) {
      console.error(error);
      return values;
    }
  };

  // enter a default number and its sequence
  const defaultNumber = 1711111;
  const [inputValue, setInputValue] = useState(defaultNumber);
  const [sequence, setSequence] = useState(collatz(defaultNumber));

  const handleCollatz = () => {
    const num = Number(inputValue);
    collatz(num);
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
      <div>
        <TimeSeriesPlot />
      </div>

      <div>{sequence.join(", ")}</div>
    </div>
  );
}

export default App;
