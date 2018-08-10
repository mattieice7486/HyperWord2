import React from "react";
import Game from "../../pages/Game.js";
import "./KeyboardSpecial.css";

const KeyboardSpecial = props => (
  <button
    onClick={props.onClick} value={props.value}
    // className={`specialBtn ${props["value"]}`}
    {...props} //is this necessary??
  />
);

export default KeyboardSpecial;