import React from "react";
import "./UserWordValue.css";

const UserWordValue = (props) => {
        return (
            <div>
            <h2 className="value">Your word's value: {props.score.toString()}</h2>
            </div>
        )
};

export default UserWordValue;

//hoisting: common interview question