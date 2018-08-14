import React from "react";
import "./PartOfSpeech.css";

// Depending on the current path, this component sets the "active" class on the appropriate navigation link item
const PartOfSpeech = props => (
        <div>
        <h1>Part of speech: {props.POS}</h1>
        </div>
);


export default PartOfSpeech;