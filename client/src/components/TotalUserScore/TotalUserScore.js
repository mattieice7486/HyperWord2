import React from "react";
import "./TotalUserScore.css";

// Depending on the current path, this component sets the "active" class on the appropriate navigation link item
const TotalUserScore = props => (
    <div>
        <h1>Score: {props.totalUserScore}</h1>
    </div>
);

export default TotalUserScore;