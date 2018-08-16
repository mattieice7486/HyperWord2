import React from "react";
import "./KeyboardSpecial.css";

const KeyboardSpecial = props => (
  <button
    onClick={props.onClick}
    className={`keyboard-btn ${props["data-value"]}`}
    {...props}
  />
);

export default KeyboardSpecial;
