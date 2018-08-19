import React from "react";
import "./ResultsMessage.css";


const ResultsMessage = props => (
  <h3 className="animated rollIn">
      {props.resultsMessage}
  </h3>
);

export default ResultsMessage;