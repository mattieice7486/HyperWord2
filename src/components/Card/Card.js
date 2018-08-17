import React from "react";
// import CardBtn from "../CardBtn";
import PartOfSpeech from "../PartOfSpeech";
import TargetScore from "../TargetScore";
import ResultsMessage from "../ResultsMessage";
import CardBtn from "../CardBtn";
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

<br />

    <ResultsMessage resultsMessage={props.resultsMessage}/>

    <CardBtn onClick={props.wonPlayAgain} value={"Won: play again"} />
    <CardBtn onClick={props.wonQuit} value={"Won: quit"}/>

    <CardBtn onClick={props.lostPlayAgain} value={"Lost: play again"}/>
    <CardBtn onClick={props.lostQuit} value={"Lost: quit"}/>

  </div>
);

export default Card;