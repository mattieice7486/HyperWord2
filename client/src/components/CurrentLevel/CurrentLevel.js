
import React from "react";
import "./CurrentLevel.css";

// Depending on the current path, this component sets the "active" class on the appropriate navigation link item
const CurrentLevel = props => (
        <div>
            <h1>Level {props.level}</h1>
        </div>
);


export default CurrentLevel;