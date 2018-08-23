import React from "react";
import "./KeyboardSubmit.css";


const KeyboardSubmit = props => (
  <button
    onClick={props.onClick} value={props.value}
  >
  {props.value}
  </button>
);

export default KeyboardSubmit;