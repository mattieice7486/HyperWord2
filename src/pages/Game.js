import React, { Component } from "react";
import Keyboard from "../components/Keyboard";
import Row from "../components/Row";
import Col from "../components/Col";
import Timer from "../components/Timer";
import AnswerSpace from "../components/AnswerSpace";
import UserScore from "../components/UserScore";

//each pupster card = the word that the user is guessing (AnswerSpace?)
//green thumb = user got correct word
//red thumb = user got it wrong

class Game extends Component {

    partsOfSpeech = { "n.": "noun", "a.": "adjective", "v.": "verb" };
    partsOfSpeechArray = Object.values(this.partsOfSpeech);
    abbreviatedPOSArray = Object.keys(this.partsOfSpeech);

    state = {
        randomPOS: this.partsOfSpeechArray[Math.floor(Math.random() * this.partsOfSpeechArray.length)],
        targetScore: Math.floor(Math.random() * (15 - 7)) + 7,
        lettersGuessedArray: [],
        runningScoreArray: [],
        wins: 0,
        userScore: 0,
        secondsLeft: 60
    };

    POSIndex = this.partsOfSpeechArray.indexOf(this.state.randomPOS);
    abbreviatedRandomPOS = this.abbreviatedPOSArray[this.POSIndex];


    //check class recording for timer demo!
    // timeOut = () => {
    //     //var newSecondsCount = this.state.secondsLeft;
    //     setInterval(function subtract() {
    //         var newSecondsCount = this.state.secondsLeft;
    //         newSecondsCount--;
    //         //this.newSecondsCount--;
    //         console.log(newSecondsCount);
    //     }
    // };

    // setInterval(timeOut, 1000);

    letterClick = (event) => { //letter click function
//////////////////// ARRAYS ARE BEING UPDATED IN CONSOLE BUT NOT ON SCREEN!!!!!!!!!! ////////////////////
        event.preventDefault();
        var letterGuessed = event.target.attributes.getNamedItem("value").value;
        var letterScore = event.target.attributes.getNamedItem("datavalue").value;
        console.log("letter: " + letterGuessed);
        console.log("score: " + letterScore);

        var newLetterArray = this.state.lettersGuessedArray; //state of letters array at that moment (click)
        newLetterArray.push(letterGuessed);
        this.setState({ lettersGuessedArray: newLetterArray });
        console.log("new letter array: " + this.state.lettersGuessedArray);

        var newScoreArray = this.state.runningScoreArray;
        newScoreArray.push(letterScore);
        this.setState({ runningScoreArray: newScoreArray });
        console.log("new score array: " + this.state.runningScoreArray); //why undefined on the first click?????
        //need to calculate total score!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    };

    clear = (event) => {
        event.preventDefault();
        console.log("clear clicked!");
        var blankLetterArray = [];
        var blankScoreArray = [];
        this.setState({
            runningScoreArray: blankScoreArray,
            lettersGuessedArray: blankLetterArray
        });
    };

    backspace = (event) => {
        event.preventDefault();
        console.log("backspace clicked!");
        var newLetterArray = this.state.lettersGuessedArray;
        newLetterArray.pop();
        this.setState({ lettersGuessedArray: newLetterArray });
        console.log("new backspaced letter array: " + this.state.lettersGuessedArray);
        var newScoreArray = this.state.runningScoreArray;
        newScoreArray.pop();
        this.setState({ runningScoreArray: newScoreArray });
        console.log("new backspaced score array: " + this.state.runningScoreArray);
    };

    submit = (event) => {
        //need if-else win/loss logic here
        //need to calculate final word score
    };



    render() {
        return (
            <div>
                <Row>
                    <h1 className="text-center">HyperWord 2</h1>
                </Row>
                <Row>
                    <h3 className="text-center">
                    Fill in the blanks with letters that add up to the target score.
                            Your word must match the part of speech as well!
                    </h3>
                </Row>
                <Row className="text-center">
                    <Timer seconds={this.state.secondsLeft}/>
                </Row>
                <Row className="text-center">
                    <AnswerSpace guesses={this.state.lettersGuessedArray}/>
                    {/* why isn't this re-rendering when state is updated???? */}
                </Row>
                <Row className="text-center">
                    <UserScore score={this.state.runningScoreArray}/>
                </Row>
                <Row className="text-center">
                <Keyboard letterClick={this.letterClick} clear={this.clear} backspace={this.backspace} submit={this.submit} />
                </Row>
            </div>
        );
    };
        
};

   
  
    // When the component mounts, load the next dog to be displayed
    // componentDidMount() {
    //   this.loadNextDog();
    // }
  
    // handleBtnClick = event => {
    //   // Get the data-value of the clicked button
    //   const btnType = event.target.attributes.getNamedItem("data-value").value;
    //   // Clone this.state to the newState object
    //   // We'll modify this object and use it to set our component's state
    //   const newState = { ...this.state };
  
    //   if (btnType === "pick") {
    //     // Set newState.match to either true or false depending on whether or not the dog likes us (1/5 chance)
    //     newState.match = 1 === Math.floor(Math.random() * 5) + 1;
  
    //     // Set newState.matchCount equal to its current value or its current value + 1 depending on whether the dog likes us
    //     newState.matchCount = newState.match
    //       ? newState.matchCount + 1
    //       : newState.matchCount;
    //   } else {
    //     // If we thumbs down'ed the dog, we haven't matched with it
    //     newState.match = false;
    //   }
    //   // Replace our component's state with newState, load the next dog image
    //   this.setState(newState);
    //   this.loadNextDog();
    // };
  
    // loadNextDog = () => {
    //   API.getRandomDog()
    //     .then(res =>
    //       this.setState({
    //         image: res.data.message
    //       })
    //     )
    //     .catch(err => console.log(err));
    // };
  
//     render() {
//       return (
//         <div>
//             <Row>
//                 <h1 className="text-center">HyperWord 2</h1>
//             </Row>
//             <Row>
//                 <h3 className="text-center">
//                 Fill in the blanks with letters that add up to the Target score.
//                         Your word must match the part of speech as well!
//                 </h3>
//             </Row>
//             <Keyboard>
//             </Keyboard>
//         </div>
//       );
//     }
//   }


//     //need to account for other abbreviations too (e.g., "v.t.")

//     //ON LOAD, when the component mounts (is added to page/tree), load the next dog to be displayed
//     // componentDidMount() {
//     // //   this.loadNextDog(); //load next word?
//     // };
  
    
    export default Game;