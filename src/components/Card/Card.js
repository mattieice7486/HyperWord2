import React from "react";
// import CardBtn from "../CardBtn";
import PartOfSpeech from "../PartOfSpeech";
import TargetScore from "../TargetScore";
import ResultsMessage from "../ResultsMessage";
import "./Card.css";
import "../PartOfSpeech/PartOfSpeech.css";
import "../TargetScore/TargetScore.css";

//want to have part of speech and target score on here

const Card = props => (
  <div
    className="card"
    style={{
      backgroundImage: props.image ? `url(${props.image})` : "none"
    }}
  >
  {/* **HOW REFER TO STATE IN GAME.JS??** */}
    <PartOfSpeech randomPOS={props.randomPOS} />  
    <TargetScore targetScore={props.targetScore} />

<br/>

    <ResultsMessage resultsMessage={props.resultsMessage}/>

    {/* {!props.image && <i className="fa fa-spinner fa-spin" aria-hidden="true" />}
    <CardBtn
      style={{ opacity: props.image ? 1 : 0 }}
      onClick={props.handleBtnClick}   //how does it know to refer to this function in Game.js???????????????
      data-value="pass"
    /> */}

  </div>
);

export default Card;