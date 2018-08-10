import React from "react";
import KeyboardLetter from "../KeyboardLetter";
import KeyboardSpecial from "../KeyboardSpecial";
import "./Keyboard.css";

//see card & cardbutton.js for keys template
//for now, just is right or wrong (don't worry about dictionary yet)
//need to add subscripts!!

//need function to push values to answerSpace?? shouldn't go here though, right?????????? How to access function here from Game.js? Game.function doesn't seem to work!!

const Keyboard = props => (
  
<div className="keyboard">    

<div className="row">
    <KeyboardLetter value={"Q"} datavalue={10} onClick={props.letterClick} /> 
    <KeyboardLetter value={"W"} datavalue={4} onClick={props.letterClick} />
    <KeyboardLetter value={"E"} datavalue={1} onClick={props.letterClick} />
    <KeyboardLetter value={"R"} datavalue={1} onClick={props.letterClick} />
    <KeyboardLetter value={"T"} datavalue={1} onClick={props.letterClick} />
    <KeyboardLetter value={"Y"} datavalue={4} onClick={props.letterClick} />
    <KeyboardLetter value={"U"} datavalue={1} onClick={props.letterClick} />
    <KeyboardLetter value={"I"} datavalue={1} onClick={props.letterClick} />
    <KeyboardLetter value={"O"} datavalue={1} onClick={props.letterClick} />
    <KeyboardLetter value={"P"} datavalue={3} onClick={props.letterClick} />
</div>

<div>        
    <KeyboardLetter value={"A"} datavalue={1} onClick={props.letterClick} />
    <KeyboardLetter value={"S"} datavalue={1} onClick={props.letterClick} />
    <KeyboardLetter value={"D"} datavalue={2} onClick={props.letterClick} />
    <KeyboardLetter value={"F"} datavalue={4} onClick={props.letterClick} />
    <KeyboardLetter value={"G"} datavalue={2} onClick={props.letterClick} />
    <KeyboardLetter value={"H"} datavalue={4} onClick={props.letterClick} />
    <KeyboardLetter value={"J"} datavalue={8} 
    onClick={props.letterClick}/>
    <KeyboardLetter value={"K"} datavalue={5} onClick={props.letterClick} />
    <KeyboardLetter value={"L"} datavalue={1} onClick={props.letterClick} />
</div>

<div>
    <KeyboardLetter value={"Z"} datavalue={10} onClick={props.letterClick} />
    <KeyboardLetter value={"W"} datavalue={4} onClick={props.letterClick} />
    <KeyboardLetter value={"C"} datavalue={3} onClick={props.letterClick} />
    <KeyboardLetter value={"V"} datavalue={4} onClick={props.letterClick} />
    <KeyboardLetter value={"B"} datavalue={3} onClick={props.letterClick} />
    <KeyboardLetter value={"N"} datavalue={1} onClick={props.letterClick} />
    <KeyboardLetter value={"M"} datavalue={3} onClick={props.letterClick} />
</div>

<div>
    <KeyboardSpecial value={"Clear"} onClick={props.clear} />
    <KeyboardSpecial value={"Backspace"} onClick={props.backspace} />
    <KeyboardSpecial value={"Submit"} onClick={props.submit} />
</div>

</div>

);

//not Game.____? console.log in onClick above works, but not this!

export default Keyboard;
