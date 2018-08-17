import React, { Component } from "react";
import Keyboard from "../components/Keyboard";
import Row from "../components/Row";
import Col from "../components/Col";
import Timer from "../components/Timer";
import AnswerSpace from "../components/AnswerSpace";
import UserWordValue from "../components/UserWordValue"; //for this round
import NewGameBtn from "../components/NewGameBtn";
import CurrentLevel from "../components/CurrentLevel";
import TotalUserScore from "../components/TotalUserScore";
//import ResultsMessage from "../components/ResultsMessage";
import Card from "../components/Card";


//import oxford-dictionary-api -- link to API in utils folder
//PARTS OF SPEECH ARE WRITTEN OUT IN THIS ONE!!!!!


//make json dummy test file with words, POS, etc., THEN pull from API
// create card buttons for play again and not (win: yes or no; loss: yes or no)
// work out POS and abbreviated POS stuff, plus pluralization or reverse
// disable buttons on click of submit
// dummy variables for dictionary lookup

// add definition?
// start button to begin game if time (see trivia game)
// on submit, trigger next card with score, result, definition!!!!!!!!!!!!!! (loadNextDog function!)
// deploy to heroku
// merge with dev


class Game extends Component {

    partsOfSpeech = {
        "n., pl.": "noun",
        "a.": "adjective",
        "v., v. t., p. p., imp., p. pr., v. i., vb. n., ": "verb",
        // ^ do these need to be entered one by one???????????????????????????????
    };
    POSArray = Object.values(this.partsOfSpeech);
    abbreviatedPOSArray = Object.keys(this.partsOfSpeech);

    state = {
        randomPOS: this.POSArray[Math.floor(Math.random() * this.POSArray.length)],
        targetScore: Math.floor(Math.random() * (15 - 7)) + 7,
        lettersGuessedArray: [],
        resultsMessage: "Fill in the blanks with letters that add up to the target score. Your word must match the part of speech as well!",
        runningScoreArray: [],
        level: 1,
        userWordValue: 0,
        totalUserScore: 0,
        scoreThisRound: 0,
        secondsLeft: 15,
        timer: null
    };

    timeOut = () => {
        var newSecondsCount = this.state.secondsLeft;
        newSecondsCount--;
        this.setState({
            secondsLeft: newSecondsCount
        });
    };

    componentDidMount() { //component = game, in this case
        let timer = setInterval(this.timeOut, 1000);
        this.setState({ timer });
        //load next dog function
    };

    POSIndex = this.POSArray.indexOf(this.state.randomPOS);
    abbreviatedRandomPOS = this.abbreviatedPOSArray[this.POSIndex];

    letterClick = (event) => {
        event.preventDefault();
        var letterGuessed = event.target.attributes.getNamedItem("value").value;
        var letterScore = event.target.attributes.getNamedItem("datavalue").value;
        var newLetterArray = this.state.lettersGuessedArray;
        newLetterArray.push(letterGuessed);
        this.setState({
            lettersGuessedArray: newLetterArray
        });
        var newScoreArray = this.state.runningScoreArray;
        newScoreArray.push(letterScore);

        function parse(item) {
            //parse runningScoreArray to integers, then calculate total
            var parsed = parseInt(item);
            return parsed;
        };
        var parsedArray = this.state.runningScoreArray.map(parse);
        function getSum(total, num) {
            return total + num;
        };
        var total = parsedArray.reduce(getSum);

        this.setState({
            runningScoreArray: newScoreArray,
            userWordValue: total
        });
    };

    clear = (event) => {
        event.preventDefault();
        var blankLetterArray = [];
        var blankScoreArray = [];
        this.setState({
            runningScoreArray: blankScoreArray,
            lettersGuessedArray: blankLetterArray,
            userWordValue: 0
        });
    };

    backspace = (event) => {
        event.preventDefault();
        var newLetterArray = this.state.lettersGuessedArray;
        newLetterArray.pop();
        this.setState({
            lettersGuessedArray: newLetterArray
        });
        var newScoreArray = this.state.runningScoreArray;
        newScoreArray.pop();

        function parse(item) {
            //parse runningScoreArray to integers, then calculate total
            var parsed = parseInt(item);
            return parsed;
        };
        var parsedArray = this.state.runningScoreArray.map(parse);
        function getSum(total, num) {
            return total + num;
        };
        var total = parsedArray.reduce(getSum);

        this.setState({
            runningScoreArray: newScoreArray,
            userWordValue: total
        });
    };

    quit = () => {
        console.log("Thanks for playing! Come back soon.")
    };


    win = () => {
        var newWinningScore = this.state.secondsLeft * 10;
        this.setState({ scoreThisRound: newWinningScore });
        //add round's score to total score AND POST TO DB/LEADERBOARD!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        var newTotalScore = this.state.totalUserScore + newWinningScore;
        this.setState({
            totalUserScore: newTotalScore,
            resultsMessage: "Congratulations, you won! You scored " + newWinningScore + " points this round. Your total score so far is " + newTotalScore + " points. Would you like to play again?"
        });

        // console.log("Congratulations, you won! This round, you scored " + newWinningScore + " points. Your total score so far is " + newTotalScore + " points. Would you like to play again?");
//////////////////////////////////////////////////////////////////////////////////////////////////////////////        
        //should i create a modal, or add this to the card????????????????????????????????????????
        //show definition?
        //disable all buttons
        //give option to play again

        //if want to play again...
            //generate new POS and target score
            //move to next level
            this.nextLevel();
        //otherwise...
            //say thanks for playing
            //push score to db (and leaderboard if applicable)!!!!!!!

    }


    loss = () => {
        //need some kind of message saying they lost
        //give option to play again
        //disable all buttons
        this.setState({
            resultsMessage: "Sorry, you lost!"
        });
    };


    submit = (event) => {
        
        //disable all buttons!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        // console.log(this.submit);
        var joinedArray = this.state.lettersGuessedArray.join("");
        clearInterval(this.state.timer);
        //this.setState({ secondsLeft: 60 }); //this shouldn't be here!!! how to pause count??????????
        //if userScore !== targetScore, loss
        if (this.state.secondsLeft === 0) {
            clearInterval(this.state.timer); //not working!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            this.loss();
        } else if (this.state.userWordValue !== this.state.targetScore) {
            this.win(); //need to delete, this is just for testing!!
            // this.loss();
        } else {
            //if joinedArray -- OR THAT WORD WITHOUT AN S -- isn't found in dictionary, loss
        } //otherwise ...
        //if part of speech doesn't match, loss
        

        // REACTIFY THIS
        // // function getDefinition() {
        // //     $.get("/api/all", function (data) {
        //         for (var i=0; i <data.length; i++) {
        //             if (guessedWord === data[i].word) { //if it's a word
        //                 //$("#definition-div").html(data[i].definition); //print definition
        //                 var wordtypelong = data[i].wordtype; //get POS from API
        //                 var wordtype = wordtypelong[0] + wordtypelong[1]; //just the first 2 characters?
        //                 if (abbreviatedRandomPOS == wordtype) { //if right POS
        //                     win();
        //                 } else {
        //                     loss();
        //                 }
        //                 return;

        //             } else {
        //             loss();
        //             }
        //         } 
        // //     });
        // // }
        // // getDefinition();
    };

    lostQuit = () => {
        console.log("hello")
    };

    wonQuit = () => {
        console.log("hi")
    };

    nextLevel = () => { //for when user wins and wants to continue to next level
        var newLevel = this.state.level + 1; //show level they're on (update this.state.level)
        this.setState({
            level: newLevel,
            userWordValue: 0,
            lettersGuessedArray: [],
            runningScoreArray: [],
            scoreThisRound: 0,
            secondsLeft: 15,
            randomPOS: this.POSArray[Math.floor(Math.random() * this.POSArray.length)],
            targetScore: Math.floor(Math.random() * (15 - 7)) + 7
        });

    };

    restartGame = () => {
        window.location.reload();
    };

// need wonQuit, lostQuit functions????????????



    render() {
        return (
            <div>
                <Row>
                    <h1 className="text-center">HyperWord 2</h1>
                </Row>
                <Row>
                    <Card randomPOS={this.state.randomPOS} targetScore={this.state.targetScore} resultsMessage={this.state.resultsMessage} lostPlayAgain={this.restartGame} wonPlayAgain={this.nextLevel} wonQuit={this.wonQuit} lostQuit={this.lostQuit} />
                </Row>
                <Row className="text-center">
                    <CurrentLevel level={this.state.level} />
                </Row>
                <Row className="text-center">
                    <TotalUserScore totalUserScore={this.state.totalUserScore} />
                </Row>
                <Row className="text-center">
                    <Timer seconds={this.state.secondsLeft}/>
                </Row>
                <Row className="text-center">
                    <AnswerSpace guesses={this.state.lettersGuessedArray.join("")}/>
                </Row>
                <Row className="text-center">
                    <UserWordValue score={this.state.userWordValue}/>
                </Row>
                <Row className="text-center">
                <Keyboard letterClick={this.letterClick} clear={this.clear} backspace={this.backspace} submit={this.submit} />
                </Row>
                <br />
                <br />
                <Row className="text-center">
                    <NewGameBtn func={this.restartGame}/>
                </Row>
                <Row className="text-center">
                    <NewGameBtn func={this.nextLevel}/>
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