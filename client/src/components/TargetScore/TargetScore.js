import React from "react";
import "./TargetScore.css";

// Depending on the current path, this component sets the "active" class on the appropriate navigation link item
const TargetScore = props => (
    <div>
    <h1 className="animated fadeIn slower">Target score: <span> {props.targetScore}</span> </h1>
    </div>
);

export default TargetScore;
