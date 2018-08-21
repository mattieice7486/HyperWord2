
import React from "react";
import "./CardBtnLoss.css";

const CardBtnLoss = props => {

  return (<button className="loss"
    style={props.style} className={props.classname} onClick={props.onClick} value={props.value} lossbtnhidden={props.lossbtnhidden}
  >
  {props.value}
  </button>)
};

export default CardBtnLoss;

//winbtnstyle={props.winbtnstyle} 
//winbtnhidden={props.winbtnhidden} 