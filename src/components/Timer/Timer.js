import React from "react";
import "./Timer.css";

var timer = function() { //should i change this to an object??
    var secondsLeft = 30;
    $(".timer-container").append("<p><span class='timer'></span></p><br>"); // $ IS NOT DEFINED???????!!!!!!!!
    setInterval(function() { //every second...
        secondsLeft--; //decrease seconds left by 1
        $(".timer").text(secondsLeft); //display seconds left
        if (secondsLeft === 0) { //if time runs out (or submit button is clicked...)
            clearInterval(timer);  //stop timer
            checkIfWon();
        }
    }, 1000);
    console.log(secondsLeft);
}


export default Timer;