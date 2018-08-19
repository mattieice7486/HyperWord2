import React, { Component, Fragment } from "react";
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


class Game extends Component {

    partsOfSpeech = {
        "n., pl.": "noun",
        "a.": "adjective",
        "v., v. t., p. p., imp., p. pr., v. i., vb. n., ": "verb",
       
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




    }


    loss = () => {

        this.setState({
            resultsMessage: "Sorry, you lost!"
        });
    };


    submit = (event) => {

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
        } 
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




    render() {
        return (
            <div>
                <Fragment>
                <Row>
                    <h1 className="header animated fadeInDown">HyperWord 2</h1>
                </Row>

                <Row>
                    <div className="instruct animated fadeInLeft">{this.state.resultsMessage}</div>
                </Row>  

                <Row className="text-center">
                    <CurrentLevel level={this.state.level} />
                </Row>

                <Row>
                    <Card className="animated fadeIn delay 3s" randomPOS={this.state.randomPOS} targetScore={this.state.targetScore} guesses={this.state.lettersGuessedArray.join("")}  />
                </Row>

                <Row>
                    <AnswerSpace guesses={this.state.lettersGuessedArray.join("")}/>
                </Row>    



                <Row className="text-center">
                    <TotalUserScore totalUserScore={this.state.totalUserScore} />
                </Row>

                <Row className="text-center">
                    <Timer seconds={this.state.secondsLeft}/>
                </Row>



                <Row className="text-center">
                    <UserWordValue score={this.state.userWordValue}/>
                </Row>

                <Row className="text-center">
                <Keyboard letterClick={this.letterClick} clear={this.clear} backspace={this.backspace} submit={this.submit} />
                </Row>

                                <Row>
                   lostPlayAgain={this.restartGame} wonPlayAgain={this.nextLevel} wonQuit={this.wonQuit} lostQuit={this.lostQuit} 
                </Row>

                <br />
                <br />
                <Row className="text-center">
                    <NewGameBtn func={this.restartGame}/>
                </Row>
                <Row className="text-center">
                    <NewGameBtn func={this.nextLevel}/>
                </Row>
                </Fragment>
            </div>
        );
    };
        
};

    
    export default Game;