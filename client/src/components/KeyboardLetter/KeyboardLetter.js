import React from "react";
import "./KeyboardLetter.css";

const KeyboardLetter = props => (
  <button
    onClick={props.onClick}
    className={`keyboard-btn ${props["data-value"]}`}
    {...props}
  />
);

export default KeyboardLetter;
