import React, { useState, useEffect } from "react";
import State from "./State";
import Props from "./Props";
import "./style/style.css";

export default function App() {
  // States are declared using useState Hook
  const [count, setCount] = useState(0);
  const [input, setInput] = useState("");
  const [isEven, setIsEven] = useState("even");

  // These are change handler functions
  const handleCountClicked = (e) => {
    e.preventDefault();
    const newCount = count + 1;
    setCount(newCount);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  useEffect(() => {
    if (count % 2 !== 0) {
      setIsEven("odd");
    } else {
      setIsEven("even");
    }
    // dependency array: everytime a change is found in this variable, it rerenders
  }, [count]);

  return (
    <div>
      {/* onClick, onChange are DOM events */}
      <p>Count is: {count}</p>
      <button onClick={handleCountClicked}>Click Me!</button>
      <br></br>
      <p>Input Text: {input}</p>
      <input onChange={handleInputChange} placeholder={`Enter input`}></input>
      <div className="grid">
        {/* setStates can't be passed as props which is why we put it inside handler functions and then passed to components as props */}
        <State add={handleCountClicked} />
        <Props add={handleCountClicked} count={count} />
      </div>
      <p>Is odd? {isEven}</p>
    </div>
  );
}
