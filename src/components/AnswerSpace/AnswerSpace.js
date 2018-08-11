import React from "react";
//import AnswerSpace from "../AnswerSpace";
import "./AnswerSpace.css";

const AnswerSpace = (props) => {
        return (
            <div>
            <h2>Answer space works! {props.message}</h2>
            </div>
        )
};

export default AnswerSpace;

//hoisting: common interview question