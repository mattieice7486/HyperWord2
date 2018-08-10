import React from "react";
import Game from "../../pages/Game.js";
import KeyboardLetter from "../KeyboardLetter";
import KeyboardSpecial from "../KeyboardSpecial";
import "./Keyboard.css";

//see card & cardbutton.js for keys template
//for now, just is right or wrong (don't worry about dictionary yet)
//FUNCTIONS GO IN GAME.JS!!!!!!!!!!!
//need to add subscripts!!

const Keyboard = props => (
  
<div className="keyboard">    

<div>
    <KeyboardLetter value={"Q"} dataValue={10} /> 
    <KeyboardLetter value={"W"} dataValue={4} />
    <KeyboardLetter value={"E"} dataValue={1} />
    <KeyboardLetter value={"R"} dataValue={1} />
    <KeyboardLetter value={"T"} dataValue={1} />
    <KeyboardLetter value={"Y"} dataValue={4} />
    <KeyboardLetter value={"U"} dataValue={1} />
    <KeyboardLetter value={"I"} dataValue={1} />
    <KeyboardLetter value={"O"} dataValue={1} />
    <KeyboardLetter value={"P"} dataValue={3} />
</div>

<div>        
    <KeyboardLetter value={"A"} dataValue={1} />
    <KeyboardLetter value={"S"} dataValue={1} />
    <KeyboardLetter value={"D"} dataValue={2} />
    <KeyboardLetter value={"F"} dataValue={4} />
    <KeyboardLetter value={"G"} dataValue={2} />
    <KeyboardLetter value={"H"} dataValue={4} />
    <KeyboardLetter value={"J"} dataValue={8} />
    <KeyboardLetter value={"K"} dataValue={5} />
    <KeyboardLetter value={"L"} dataValue={1} />
</div>

<div>
    <KeyboardLetter value={"Z"} dataValue={10} />
    <KeyboardLetter value={"W"} dataValue={4} />
    <KeyboardLetter value={"C"} dataValue={3} />
    <KeyboardLetter value={"V"} dataValue={4} />
    <KeyboardLetter value={"B"} dataValue={3} />
    <KeyboardLetter value={"N"} dataValue={1} />
    <KeyboardLetter value={"M"} dataValue={3} />
    <KeyboardLetter value={"W"} dataValue={4} />
</div>

<div>
    <KeyboardSpecial value={"Clear"} onClick={Game.clear} />
    <KeyboardSpecial value={"Backspace"} onClick={Game.backspace} />
    <KeyboardSpecial value={"Submit"} onClick={Game.submit} />
</div>

</div>

);

export default Keyboard;
