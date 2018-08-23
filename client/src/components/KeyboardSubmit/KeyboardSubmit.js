import React from "react";
import "./KeyboardSubmit.css";


const KeyboardSubmit = props => (
  <button className="keyBoard"
    onClick={props.onClick} value={props.value}
  >
  {props.value}
  </button>
);

export default KeyboardSubmit;