import React, { Component } from "react";
import Keyboard from "../components/Keyboard";
import Row from "../components/Row";
import Col from "../components/Col";
import Timer from "../components/Timer";
import AnswerSpace from "../components/AnswerSpace";
import UserWordValue from "../components/UserWordValue"; //for this round
import CurrentLevel from "../components/CurrentLevel";
import TotalUserScore from "../components/TotalUserScore";
import Card from "../components/Card";
//import CardBtn from "../components/CardBtn";
//import API from "../utils/API.js";////////////////////////////
//Definition??



// create card buttons for play again and not (win: yes or no; loss: yes or no)
// disable buttons on click of submit
// start button to begin game if time (see trivia game)
// on submit, trigger next card with score, result, definition (loadNextDog function!)
// merge with dev
// deploy to heroku
// PREPARE PRESENTATION --
    // tell a story: how you got there (challenges, how you've worked through them)
    // use buzzwords: state, etc. -- JQuery to React how?
    // focus more on demoing -- no powerpoint
    // what we've taken from this class (how to juggle hw while working full-time)


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
        //ishidden: false,
        winbtnhidden: true,
        lossbtnhidden: true,
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

        // this.setState({ishidden: !this.state.ishidden})

        this.setState({ scoreThisRound: newWinningScore });
        //add round's score to total score AND POST TO DB/LEADERBOARD!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        var newTotalScore = this.state.totalUserScore + newWinningScore;
        //how to show buttons????????????? 
        this.setState({
            // ishidden: "false", 
            winbtnhidden: false,
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
            resultsMessage: "Sorry, you lost!",
            lossbtnhidden: false
        });
    };



    submit = (event) => {
        //disable all buttons!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        var joinedArray = this.state.lettersGuessedArray.join("");
        clearInterval(this.state.timer);

        function checkForWord() {
            // API.doesDefinitionExist(joinedArray) //switch to joinedArray
            // .then(function(res) {
            //     if (res) {
            //         console.log(res.data) //identify no match by error code?
            //     }
            //     else {
            //         console.log("not a word!")
            //         this.loss();
            //     }
            // }
            // )
            //   .catch(err => console.log(err));
        };
        



        //if userScore !== targetScore, loss
        if (this.state.userWordValue === this.state.targetScore) { //CHANGE BACK TO !==
            this.loss();
        } else { 
            checkForWord();
                
            //if joinedArray -- OR THAT WORD WITHOUT AN S -- isn't found in dictionary, loss

        } //otherwise ...
        //if part of speech doesn't match, loss        

    };

    lostQuit = () => {
        this.setState({
            resultsMessage: "Thanks for playing! Come back soon."
        });
    };

    wonQuit = () => {
        this.setState({
            resultsMessage: "Thanks for playing! Come back soon."
        });
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

    // winbtnstyle = {
    //     display: this.state.winbtnhidden? "none" : "block"
    // };

    // lossbtnstyle = {
    //     display: this.state.lossbtnhidden? "none" : "block" //if lossbuttonhidden not set to true, don't show
    // }; //////////////////////////////////////////////////////////////

//ok so want to render card buttons onto card.js...
//in game.js, need to pass in card style
//



    render() {
        return (
            <div>
                <Row>
                    <h1 className="text-center">HyperWord 2</h1>
                </Row>
                <Row>
                    <Card winbtnstyle={{display: this.state.winbtnhidden? "none" : "block"}} lossbtnstyle={{display: this.state.lossbtnhidden? "none" : "block"}} winbtnhidden={this.state.winbtnhidden} lossbtnhidden={this.state.lossbtnhidden}imgSrc="https://media.giphy.com/media/SIulatisvJhV7KPfFz/giphy.gif" randomPOS={this.state.randomPOS} targetScore={this.state.targetScore} resultsMessage={this.state.resultsMessage} lostPlayAgain={this.restartGame} wonPlayAgain={this.nextLevel} wonQuit={this.wonQuit} lostQuit={this.lostQuit}>
                    
                    
                    </Card>
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