import React, { useState } from "react";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [sequence, setSequence] = useState([]);

  const collatz = (num) => {
    let values = [num];
    while (num !== 1) {
      if (num % 2 === 0) num = num / 2;
      else num = 3 * num + 1;
      values.push(num);
    }
    setSequence(values);
  };

  const handleCollatz = () => {
    const num = Number(inputValue);
    collatz(num);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div>
      <div>Collatz Conjecture!</div>
      <input
        type="number"
        value={inputValue}
        onChange={handleInputChange}
        min="1"
      />
      <button onClick={handleCollatz}>Submit</button>
      <div>{sequence.join(", ")}</div>
    </div>
  );
}

export default App;
