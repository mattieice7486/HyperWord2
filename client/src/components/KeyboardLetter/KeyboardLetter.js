import React from "react";
import "./KeyboardLetter.css";

const KeyboardLetter = props => (
  <button
    onClick={props.onClick}
    className={`btn btn-danger ${props["data-value"]}`}
    {...props}
    >{props.letter}
  </button>
);

export default KeyboardLetter;
