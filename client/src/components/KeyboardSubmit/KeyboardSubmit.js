import React from "react";
import "./KeyboardSubmit.css";


const KeyboardSubmit = props => (
  <button
    onClick={props.onClick} value={props.value}
    //className={`specialBtn ${props["value"]}`}
    //{...props} //is this necessary??
  >
  {props.value}
  </button>
);

export default KeyboardSubmit;