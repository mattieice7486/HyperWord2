import React from "react";
import "./KeyboardLetter.css";

const KeyboardLetter = (props) => (
  <button className="keyBoard"
    onClick={props.onClick}
    value={props.value}
    datavalue={props.datavalue}
  >
  <span style={{fontSize: 18}} value={props.value} datavalue={props.datavalue}>{props.value}</span>
  <span style={{fontSize: 14}} value={props.value} datavalue={props.datavalue}>{props.datavalue}</span>
  </button>
);

export default KeyboardLetter;
