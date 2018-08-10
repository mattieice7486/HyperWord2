import React from "react";
import Game from "../../pages/Game.js";
import KeyboardLetter from "../KeyboardLetter";
import KeyboardSpecial from "../KeyboardSpecial";
import "./Keyboard.css";

//see card & cardbutton.js for keys template
//for now, just is right or wrong (don't worry about dictionary yet)
//need to add subscripts!!
//how to center all the keys in the div??

//need function to push values to answerSpace??

const Keyboard = props => (
  
<div className="keyboard">    

<div className="row">
    <KeyboardLetter value={"Q"} datavalue={10} /> 
    <KeyboardLetter value={"W"} datavalue={4} />
    <KeyboardLetter value={"E"} datavalue={1} />
    <KeyboardLetter value={"R"} datavalue={1} />
    <KeyboardLetter value={"T"} datavalue={1} />
    <KeyboardLetter value={"Y"} datavalue={4} />
    <KeyboardLetter value={"U"} datavalue={1} />
    <KeyboardLetter value={"I"} datavalue={1} />
    <KeyboardLetter value={"O"} datavalue={1} />
    <KeyboardLetter value={"P"} datavalue={3} />
</div>

<div>        
    <KeyboardLetter value={"A"} datavalue={1} />
    <KeyboardLetter value={"S"} datavalue={1} />
    <KeyboardLetter value={"D"} datavalue={2} />
    <KeyboardLetter value={"F"} datavalue={4} />
    <KeyboardLetter value={"G"} datavalue={2} />
    <KeyboardLetter value={"H"} datavalue={4} />
    <KeyboardLetter value={"J"} datavalue={8} />
    <KeyboardLetter value={"K"} datavalue={5} />
    <KeyboardLetter value={"L"} datavalue={1} />
</div>

<div>
    <KeyboardLetter value={"Z"} datavalue={10} />
    <KeyboardLetter value={"W"} datavalue={4} />
    <KeyboardLetter value={"C"} datavalue={3} />
    <KeyboardLetter value={"V"} datavalue={4} />
    <KeyboardLetter value={"B"} datavalue={3} />
    <KeyboardLetter value={"N"} datavalue={1} />
    <KeyboardLetter value={"M"} datavalue={3} />
</div>

<div>
    <KeyboardSpecial value={"Clear"} onClick={Game.clear} />
    <KeyboardSpecial value={"Backspace"} onClick={Game.backspace} />
    <KeyboardSpecial value={"Submit"} onClick={Game.submit} />
</div>

</div>

);

export default Keyboard;
