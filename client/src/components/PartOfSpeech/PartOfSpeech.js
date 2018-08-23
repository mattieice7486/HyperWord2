import React from "react";
import "./PartOfSpeech.css";

// Depending on the current path, this component sets the "active" class on the appropriate navigation link item
const PartOfSpeech = props => (
        <div>
        <h4 className="pos">Part of speech: {props.randomPOS}</h4>
        </div>
);


export default PartOfSpeech;