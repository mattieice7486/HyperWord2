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
  <div className="card">
      <PartOfSpeech randomPOS={props.randomPOS} />  
      <CardImg imgSrc={props.imgSrc}
      className="cardImage"
      />
      <TargetScore targetScore={props.targetScore} />
      <ResultsMessage resultsMessage={props.resultsMessage}/>

      <CardBtnWin style={props.winbtnstyle} winbtnhidden={props.winbtnhidden} className={"wonPlayAgain"} onClick={props.wonPlayAgain} value={"Next Round"} />
      <CardBtnLoss style={props.lossbtnstyle} lostbtnhidden={props.lossbtnhidden} onClick={props.lostPlayAgain} value={"Restart"}/>
  </div>
);

export default Card;
