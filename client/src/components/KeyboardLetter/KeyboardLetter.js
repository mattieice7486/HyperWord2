import React from "react";
import "./KeyboardLetter.css";

const KeyboardLetter = (props) => (
  <button
    onClick={props.onClick}
    value={props.value}
    datavalue={props.datavalue}
    // {...props}
  >
  <span style={{fontSize: 16}} value={props.value} datavalue={props.datavalue}>{props.value}</span>
  <span style={{fontSize: 10}} value={props.value} datavalue={props.datavalue}>{props.datavalue}</span>
  </button>
);

export default KeyboardLetter;