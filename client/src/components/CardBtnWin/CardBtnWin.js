
import React from "react";
import "./CardBtnWin.css";

const CardBtnWin = props => {

  return (<button
    style={props.style} className={props.classname} onClick={props.onClick} value={props.value} winbtnhidden={props.winbtnhidden}
  >
  {props.value}
  </button>)
};

export default CardBtnWin;