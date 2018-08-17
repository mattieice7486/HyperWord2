import React from "react";
import "./CardBtn.css";

const CardBtn = props => (
  <button
    onClick={props.onClick} value={props.value}
  >
  {props.value}
  </button>
);

export default CardBtn;
