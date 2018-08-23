import React from "react";
import "./KeyboardSpecial.css";

const KeyboardSpecial = props => (
  <button className="keyBoard"
    onClick={props.onClick} value={props.value}
  >
  {props.value}
  </button>
);

export default KeyboardSpecial;