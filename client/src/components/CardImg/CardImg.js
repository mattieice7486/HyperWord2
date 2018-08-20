import React from "react";
import "./CardImg.css";

const CardImg = props => (
  <img src={props.imgSrc} className={props.className}/>
);

export default CardImg;