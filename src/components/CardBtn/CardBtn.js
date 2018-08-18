
import React from "react";
import "./CardBtn.css";

const CardBtn = props => (
  <container className="hold">
  <button className="result"
    onClick={props.onClick} value={props.value}
  >
  {props.value}
  </button>
  </container>
);

export default CardBtn;