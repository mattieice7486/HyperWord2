import React from "react";
import Game from "../../pages/Game.js";
import "./KeyboardLetter.css";

const KeyboardLetter = (props) => (
  <button
    onClick={Game.letterClick}
    value={props.value}
    datavalue={props.datavalue}
    className={`letter`}
    // {...props}
  >
  {props.value}
  </button>
);

export default KeyboardLetter;