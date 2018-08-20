import React from "react";
import "./CardBtn.css";

const CardBtn = props => {

  return (<button
    style={props.lossbtnstyle} winbtnstyle={props.winbtnstyle} className={props.classname} onClick={props.onClick} value={props.value} winbtnhidden={props.winbtnhidden} lossbtnhidden={props.lossbtnhidden}
  >
  {props.value}
  </button>)
};

//style={if (this.state.ishidden == "true") { display: 'none' }}

export default CardBtn;
