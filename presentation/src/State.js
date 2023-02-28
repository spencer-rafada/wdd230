import React, { useState } from "react";

export default function State({ add }) {
  // export default function State(props) {
  // one part of planning when using React is planning where to put the state
  const [state, setState] = useState(0);
  return (
    <div>
      <button onClick={add}>Add more!</button>
      {/* <button onClick={props.add}>Add more!</button> */}
      <p>State Component: {state}</p>
    </div>
  );
}
