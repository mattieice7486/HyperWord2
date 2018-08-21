import React from "react";
import "./Timer.css";

const Timer = (props) => {
    return (
        <div>
        <h3>Seconds left: {props.seconds}</h3>
        </div>
    )
    // state = {
    //     secondsLeft: 60
    // };

    // this.timer = setInterval(function add() {
    //     this.num++;
    //     console.log(this.num);
    //   }, 1000);


    // setInterval = (props) => {
    //     this.state.secondsLeft: this.state.secondsLeft - 1,
    //     if (this.state.secondsLeft === 0) {
    //         clearInterval();
    //     }
    // }
};


// var timer = function() { //should i change this to an object??
//     var secondsLeft = 30;
//     $(".timer-container").append("<p><span class='timer'></span></p><br>"); // $ IS NOT DEFINED???????!!!!!!!!
//     setInterval(function() { //every second...
//         secondsLeft--; //decrease seconds left by 1
//         $(".timer").text(secondsLeft); //display seconds left
//         if (secondsLeft === 0) { //if time runs out (or submit button is clicked...)
//             clearInterval(timer);  //stop timer
//             checkIfWon();
//         }
//     }, 1000);
//     console.log(secondsLeft);
// }


export default Timer;