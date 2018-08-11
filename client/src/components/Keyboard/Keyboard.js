import React from "react";
import KeyboardLetter from "../KeyboardLetter";
import KeyboardSpecial from "../KeyboardSpecial";
import "./Keyboard.css";

const Keyboard = props => (
  <div
    className="card"
    style={{
      backgroundImage: props.image ? `url(${props.image})` : "none"
    }}
  >
    {!props.image && <i className="fa fa-spinner fa-spin" aria-hidden="true" />}
    <KeyboardLetter
      style={{ opacity: props.image ? 1 : 0 }}
      onClick={props.handleBtnClick}
      data-value="pass"
    />
    <KeyboardLetter
      style={{ opacity: props.image ? 1 : 0 }}
      onClick={props.handleBtnClick}
      data-value="pick"
    />
  </div>
);

export default Keyboard;
