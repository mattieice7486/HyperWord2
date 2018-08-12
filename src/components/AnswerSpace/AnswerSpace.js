import React from "react";
//import AnswerSpace from "../AnswerSpace";
import "./AnswerSpace.css";
//import "../Keyboard"

const AnswerSpace = (props) => {
    return (
        <div>
            <h1>
                Your letters: 
                <br/>
                {props.guesses.toString()}
            </h1>
        </div>
    )
};

export default AnswerSpace;

//hoisting: common interview question