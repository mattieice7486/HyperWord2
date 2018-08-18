import React from "react";
import PartOfSpeech from "../PartOfSpeech";
import TargetScore from "../TargetScore";
import ResultsMessage from "../ResultsMessage";
import CardBtn from "../CardBtn";
import CardImg from "../CardImg";
import "./Card.css";
import "../PartOfSpeech/PartOfSpeech.css";
import "../TargetScore/TargetScore.css";

//want to have part of speech and target score on here

const Card = props => (
  <div
    className="card"
    // style={{
    //   backgroundImage: props.image ? `url(${props.image})` : "none"
    // }}
  >
    <PartOfSpeech randomPOS={props.randomPOS} />  
    <TargetScore targetScore={props.targetScore} />

    <CardImg imgSrc={props.imgSrc} className={"cardImage"}/>


<br />

    <ResultsMessage resultsMessage={props.resultsMessage}/>
<div className={"buttonsDiv"}>
    <CardBtn style={{display: "none"}} ishidden={props.ishidden} className={"wonPlayAgain"} onClick={props.wonPlayAgain} value={"Won: play again"} />
    <CardBtn onClick={props.wonQuit} value={"Won: quit"}/>

    <CardBtn onClick={props.lostPlayAgain} value={"Lost: play again"}/>
    <CardBtn onClick={props.lostQuit} value={"Lost: quit"}/>

</div>
  </div>
);

export default Card;