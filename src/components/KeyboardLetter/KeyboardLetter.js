import React from "react";
import Game from "../../pages/Game.js";
import "./KeyboardLetter.css";

const KeyboardLetter = (props) => (
  <button
    onClick={Game.letterClick}
    value={props.value}
    data-value={props.dataValue} //changed from data-value
    className={`letter ${props["value"]}`}
    {...props}
  />
);

export default KeyboardLetter;