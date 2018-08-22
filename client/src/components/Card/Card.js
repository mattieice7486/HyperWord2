import React from "react";
import PartOfSpeech from "../PartOfSpeech";
import TargetScore from "../TargetScore";
import ResultsMessage from "../ResultsMessage";
import CardBtnLoss from "../CardBtnLoss";
import CardBtnWin from "../CardBtnWin";
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

    <CardBtnWin style={props.winbtnstyle} winbtnhidden={props.winbtnhidden} className={"wonPlayAgain"} onClick={props.wonPlayAgain} value={"Play again"} />
    <CardBtnWin style={props.winbtnstyle} winbtnhidden={props.winbtnhidden} onClick={props.wonQuit} value={"Quit"}/>

    <CardBtnLoss style={props.lossbtnstyle} lostbtnhidden={props.lossbtnhidden} onClick={props.lostPlayAgain} value={"Play again"}/>
    <CardBtnLoss style={props.lossbtnstyle} lostbtnhidden={props.lossbtnhidden} onClick={props.lostQuit} value={"Quit"}/>


  </div>
);

export default Card;