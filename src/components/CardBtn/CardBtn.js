import React from "react";
import "./CardBtn.css";

const CardBtn = props => (
  <button
    ishidden={props.ishidden} style={props.style} className={props.classname} onClick={props.onClick} value={props.value}
  >
  {props.value}
  </button>
);

//style={if (this.state.ishidden == "true") { display: 'none' }}

export default CardBtn;
