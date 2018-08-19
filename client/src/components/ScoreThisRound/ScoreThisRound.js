import React from "react";
import "./ScoreThisRound.css";

// Depending on the current path, this component sets the "active" class on the appropriate navigation link item
const ScoreThisRound = props => (
    <div>
    <h3>Your score this round: {props.scoreThisRound}</h3>
    </div>
);

export default ScoreThisRound;