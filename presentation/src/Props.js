import React from "react";

export default function Props({ add, count }) {
  return (
    <div>
      <button onClick={add}>Add more!</button>
      <p>Props Component: {count}</p>
    </div>
  );
}
