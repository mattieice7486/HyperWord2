import React from "react";
import "./Timer.css";

const Timer = (props) => {
    return (
        <div className="timer">
            <span>{props.seconds}</span>
        </div>
    )
};



export default Timer;