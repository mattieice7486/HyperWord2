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
import Card from "../components/Card";

//on submit, doesn't clear total user score!!!!!!!!!!!!!!!!!!!!!!!!!!!
//timer doesn't resume when next level begins!!!!!!!!!!!!!!!!!!!!!!!!!
// win-loss logic
// other more complex parts of speech, and pluralize words?

// add definition?
// start button to begin game if time
// on submit, trigger next card with score, result, definition!!!!!!!!!!!!!! (loadNextDog function!)
// deploy to heroku
// merge with dev


// on load AND on start of new game...
    //generate new randomPOS and targetScore
    //set score to 0
    //restart timer
    //clear lettersGuessedArray
        // ^ but all of this happens anyway on load

//on start of new game ONLY...
    //show level they're on


class Game extends Component {

    partsOfSpeech = {
        "n.": "noun",
        "a.": "adjective",
        "v.": "verb", //add transitive verb, etc.
        "t.v.": "verb"
    };
    partsOfSpeechArray = Object.values(this.partsOfSpeech);
    abbreviatedPOSArray = Object.keys(this.partsOfSpeech);

    state = {
        randomPOS: this.partsOfSpeechArray[Math.floor(Math.random() * this.partsOfSpeechArray.length)],
        targetScore: Math.floor(Math.random() * (15 - 7)) + 7,
        //// ^ how to update these two variables on win?? ////
        lettersGuessedArray: [],
        runningScoreArray: [],
        //wins: 0,
        level: 1,
        userWordValue: 0, //should update on click of letter, not just on click of submit
        // userScoreThisRound: 0,
        totalUserScore: 0,
        scoreThisRound: 0,
        secondsLeft: 60,
        timer: null
    };

    timeOut = () => {
        var newSecondsCount = this.state.secondsLeft;
        newSecondsCount--;
        this.setState({
            secondsLeft: newSecondsCount
        });
        //console.log("seconds left: " + this.state.secondsLeft)
    };

    componentDidMount() { //component = game, in this case
        let timer = setInterval(this.timeOut, 1000);
        this.setState({ timer });
        //load next dog function
    };

    POSIndex = this.partsOfSpeechArray.indexOf(this.state.randomPOS);
    abbreviatedRandomPOS = this.abbreviatedPOSArray[this.POSIndex];

    //function to calculate total??

    letterClick = (event) => {
        event.preventDefault();
        var letterGuessed = event.target.attributes.getNamedItem("value").value;
        var letterScore = event.target.attributes.getNamedItem("datavalue").value;
        // console.log("letter: " + letterGuessed);
        // console.log("score: " + letterScore);
        var newLetterArray = this.state.lettersGuessedArray;
        newLetterArray.push(letterGuessed);
        //console.log("new letter array: " + this.state.lettersGuessedArray);
        this.setState({
            lettersGuessedArray: newLetterArray
        });
        var newScoreArray = this.state.runningScoreArray;
        newScoreArray.push(letterScore);

        function parse(item) {
            //parse runningScoreArray to integers
            //then calculate total
            var parsed = parseInt(item);
            return parsed;
        };
        var parsedArray = this.state.runningScoreArray.map(parse);
        //console.log("parsed array: " + parsedArray);
        function getSum(total, num) {
            return total + num;
        };
        var total = parsedArray.reduce(getSum);

        this.setState({
            runningScoreArray: newScoreArray,
            userWordValue: total
        });
        //console.log("new score array: " + this.state.runningScoreArray);
    };

    clear = (event) => {
        event.preventDefault();
        var blankLetterArray = [];
        var blankScoreArray = [];
        //console.log(this.state.randomPOS) //renders but doesn't print to card!!!!!!!!!!!!!!!!!!

        this.setState({
            runningScoreArray: blankScoreArray,
            lettersGuessedArray: blankLetterArray,
            userWordValue: 0
        });
    };

    backspace = (event) => {
        event.preventDefault();
        //console.log("backspace clicked!");
        var newLetterArray = this.state.lettersGuessedArray;
        newLetterArray.pop();
        this.setState({
            lettersGuessedArray: newLetterArray
        });
        //console.log("new backspaced letter array: " + this.state.lettersGuessedArray);
        var newScoreArray = this.state.runningScoreArray;
        newScoreArray.pop();

        function parse(item) {
            //parse runningScoreArray to integers
            //then calculate total
            var parsed = parseInt(item);
            return parsed;
        };
        var parsedArray = this.state.runningScoreArray.map(parse);
        //console.log("parsed array: " + parsedArray);
        function getSum(total, num) {
            return total + num;
        };
        var total = parsedArray.reduce(getSum);

        this.setState({
            runningScoreArray: newScoreArray,
            userWordValue: total
        });
        //console.log("new score array: " + this.state.runningScoreArray);
    };



    win = () => {
        
        //display score from this round
        var newWinningScore = this.state.secondsLeft * 10;
        //console.log("new winning score: " + newWinningScore); //ok
        this.setState({ scoreThisRound: newWinningScore });
        //console.log("score this round: " + this.state.scoreThisRound);
        //add round's score to total score AND POST TO DB/LEADERBOARD!!!!!
        var newTotalScore = this.state.totalUserScore + newWinningScore;
        //console.log("new total score: " + newTotalScore); //ok
        this.setState({ totalUserScore: newTotalScore });
        //print both to screen

        console.log("Congratulations, you won! This round, you scored " + newWinningScore + " points. Your total score so far is " + newTotalScore + " points. Would you like to play again?");
        //display score and push to db and leaderboard
        //show definition?
        //add 1 to wins tally? necessary??
        
        //stop timer
        //clearInterval(this.state.timer); //RESUME ON LOAD OF NEW GAME
        //disable all buttons
        //give option to play again

        //if want to play again...
            //generate new POS and target score
            //move to next level
            this.nextLevel();
        //otherwise...
            //say thanks for playing
            //push score to db (and leaderboard if applicable)

    }


    loss = () => {
        //need some kind of message saying they lost
        //give option to play again (need "new game" button??)
        //stop timer
        //clearInterval(this.state.timer);
        //disable all buttons
        console.log("sorry, you lost!");
    };


    submit = (event) => {

        //var joinedArray = this.state.lettersGuessedArray.join("");
        //console.log(joinedArray);
        this.setState({ secondsLeft: 60 });
        //clearInterval(this.state.timer);
        //if userScore !== targetScore, loss
        if (this.state.userWordValue !== this.state.targetScore) {
            this.win(); //need to delete, this is just for testing!!
            // this.loss();
        } else {
            //if joinedArray isn't found in dictionary, loss
        } //otherwise ... if part of speech doesn't match, loss
        //otherwise, win

        
        // var win = false; //this part is just for testing purposes
        // if (win === true) {
        //     this.win();
        //     //calculate final word score
        // } else if (win === false) {
        //     this.loss();
        // }
    };

    nextLevel = () => { //for when user wins and wants to continue to next level
    
        var newLevel = this.state.level + 1; //show level they're on (update this.state.level)

        //console.log("you're on level " + this.state.level);
        //calculate totalUserScore (all past scores since last reload added together)!!!!!!!!!!!!!!!

        this.setState({
            level: newLevel,
            userWordValue: 0, //set current word value to 0
            lettersGuessedArray: [], //clear lettersGuessedArray
            runningScoreArray: [],
            scoreThisRound: 0,
            secondsLeft: 60,
            //RESET TIMER!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1
            //generate new randomPOS and targetScore
            randomPOS: this.partsOfSpeechArray[Math.floor(Math.random() * this.partsOfSpeechArray.length)],
            targetScore: Math.floor(Math.random() * (15 - 7)) + 7
        });

        // let timer = setInterval(this.timeOut, 1000);
        // this.setState({ timer }); ???????????????????????????????????


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
                    <Card randomPOS={this.state.randomPOS} targetScore={this.state.targetScore}/>
                </Row>
                <Row>
                    <h3 className="text-center">
                    Fill in the blanks with letters that add up to the target score. Your word must match the part of speech as well!
                    </h3>
                </Row>
                <Row className="text-center">
                    <CurrentLevel level={this.state.level} />
                </Row>
                {/* <Row className="text-center">
                    <ScoreThisRound scoreThisRound={this.state.scoreThisRound} />
                </Row> */}
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