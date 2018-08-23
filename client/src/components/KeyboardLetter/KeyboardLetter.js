import React from "react";
import "./KeyboardLetter.css";

const KeyboardLetter = (props) => (
  <button
    onClick={props.onClick}
    value={props.value}
    datavalue={props.datavalue}
    {...props}
  >
  {props.value}
  </button>
);

export default KeyboardLetter;