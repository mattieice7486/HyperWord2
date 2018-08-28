import React from "react";
import "./CardBtnLoss.css";

const CardBtnLoss = props => {

  return (
    <button className="loseBtn"
      style={props.style}
      className={props.classname}
      onClick={props.onClick}
      value={props.value}
      lossbtnhidden={props.lossbtnhidden}
    >
      {props.value}
    </button>
  )
};

export default CardBtnLoss;