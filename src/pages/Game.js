import React, { Component } from "react";
import Keyboard from "../components/Keyboard";
import Row from "../components/Row";
import Col from "../components/Col";
import Timer from "../components/Timer";
import AnswerSpace from "../components/AnswerSpace";
import UserWordValue from "../components/UserWordValue"; //for this round
//import NewGameBtn from "../components/NewGameBtn";
import CurrentLevel from "../components/CurrentLevel";
import TotalUserScore from "../components/TotalUserScore";
//import ResultsMessage from "../components/ResultsMessage";
import Card from "../components/Card";
import API from "../utils/API.js";



// make json dummy test file with words, POS, etc., THEN pull from API (need key, ID, etc.)
// create card buttons for play again and not (win: yes or no; loss: yes or no)
// disable buttons on click of submit
// start button to begin game if time (see trivia game)
// on submit, trigger next card with score, result, definition (loadNextDog function!)
// merge with dev
// deploy to heroku

// for the API, do I even need to loop through all entries? can I just see if joinedArray returns any definition?????




class Game extends Component {

    partsOfSpeech = [
        "noun",
        "verb",
        "adjective"
    ];

    // POSArray = Object.values(this.partsOfSpeech);
    // abbreviatedPOSArray = Object.keys(this.partsOfSpeech);

    state = {
        randomPOS: this.partsOfSpeech[Math.floor(Math.random() * this.partsOfSpeech.length)],
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
        if (this.state.secondsLeft === 0) {
            clearInterval(this.state.timer);
            this.loss();
        };
    };

    componentDidMount() { //component = game, in this case
        let timer = setInterval(this.timeOut, 1000);
        this.setState({ timer });
        //load next dog function
    };

    // POSIndex = this.partsOfSpeech.indexOf(this.state.randomPOS);
    // abbreviatedRandomPOS = this.abbreviatedPOSArray[this.POSIndex];

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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////        
        //show definition?
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

        // function searchForWord() {
        //     Words.map(function(thisWord) {
        //         return thisWord.word;
        //     }).indexOf(joinedArray);
        // }
        
        // console.log(searchForWord); //undefined



        //word: results.id; POS: results.lexicalEntries.lexicalCategory

        function checkForWord() {
            API.doesDefinitionExist("ace") //switch to joinedArray
            .then(function(res) {
                if (res) {
                    console.log("definition found!")
                }
            }
            )
              .catch(err => console.log(err));
        };

        checkForWord();



        //if userScore !== targetScore, loss
        if (this.state.userWordValue !== this.state.targetScore) {
            //this.win(); //need to delete, this is just for testing!!
            this.loss();
        } else {
              console.log("whatever")  
                
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

    lostQuit = () => { //////////////////////////////////////////////////
        console.log("hello")
    };

    wonQuit = () => { //////////////////////////////////////////////////
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
            randomPOS: this.partsOfSpeech[Math.floor(Math.random() * this.partsOfSpeech.length)],
            targetScore: Math.floor(Math.random() * (15 - 7)) + 7
        });

    };

    restartGame = () => {
        window.location.reload();
    };


    render() {
        return (
            <div>
                <Row>
                    <h1 className="text-center">HyperWord 2</h1>
                </Row>
                <Row>
                    <Card imgSrc="https://media.giphy.com/media/SIulatisvJhV7KPfFz/giphy.gif" randomPOS={this.state.randomPOS} targetScore={this.state.targetScore} resultsMessage={this.state.resultsMessage} lostPlayAgain={this.restartGame} wonPlayAgain={this.nextLevel} wonQuit={this.wonQuit} lostQuit={this.lostQuit} />
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
            </div>
        );
    };
        
};    

export default Game;