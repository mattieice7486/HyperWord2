import React from "react";
import "./CardBtn.css";

const CardBtn = props => (
  <button
    isHidden={props.isHidden} className={props.classname} onClick={props.onClick} value={props.value}
  >
  {props.value}
  </button>
);

export default CardBtn;
