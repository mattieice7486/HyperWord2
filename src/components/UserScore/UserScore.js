import React from "react";
//import AnswerSpace from "../AnswerSpace";
import "./UserScore.css";

const UserScore = (props) => {
        return (
            <div>
            <h2>Your score: {props.score}</h2>
            </div>
        )
};

export default UserScore;

//hoisting: common interview question