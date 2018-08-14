import React, { Component } from "react";
import Keyboard from "../components/Keyboard";
import Row from "../components/Row";
import Col from "../components/Col";
import Timer from "../components/Timer";
import AnswerSpace from "../components/AnswerSpace";
import UserScore from "../components/UserScore"; //for this round
import TargetScore from "../components/TargetScore";
import PartOfSpeech from "../components/PartOfSpeech";
import NewGameBtn from "../components/NewGameBtn";
import CurrentLevel from "../components/CurrentLevel";
import TotalUserScore from "../components/TotalUserScore";


// win-loss logic
// generate new POS and target score on load
// other more complex parts of speech, and pluralize words?
// starting new round of game
// add definition?


//on load AND on start of new game...
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
        userScore: 0, //should update on click of letter, not just on click of submit
        totalUserScore: 0,
        secondsLeft: 60,
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
        //generate new POS and target score?????????????????
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
        console.log("new letter array: " + this.state.lettersGuessedArray);
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
            userScore: total
        });
        console.log("new score array: " + this.state.runningScoreArray);
    };

    clear = (event) => {
        event.preventDefault();
        //console.log("clear clicked!");
        var blankLetterArray = [];
        var blankScoreArray = [];

        this.setState({
            runningScoreArray: blankScoreArray,
            lettersGuessedArray: blankLetterArray,
            userScore: 0
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
        console.log("new backspaced letter array: " + this.state.lettersGuessedArray);
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
            userScore: total
        });
        console.log("new score array: " + this.state.runningScoreArray);
    };



    win = () => {
        
        console.log("Congratulations, you won! Your total score was " + this.state.userScore + " points.")

        //display score and push to db and leaderboard
        //show definition?
        //add 1 to wins tally
        //stop timer
        clearInterval(this.timer); //or clearInterval(this.timer)??
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
        clearInterval(this.timer); //or clearInterval(this.timer)??
        //disable all buttons
        console.log("sorry, you lost!");
    };


    submit = (event) => {
        //need if-else win/loss logic here
        var joinedArray = this.state.lettersGuessedArray.join("");
        console.log(joinedArray);
        //if userScore !== targetScore, loss
        if (this.state.userScore !== this.state.targetScore) {
            this.loss();
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
        this.setState({ level: newLevel });

        //calculate totalUserScore (all past scores since last reload added together)!!!!!!!!!!!!!!!

        this.setState({
            userScore: 0, //set score FOR THIS ROUND to 0
            lettersGuessedArray: [], //clear lettersGuessedArray
            randomPOS: this.partsOfSpeechArray[Math.floor(Math.random() * this.partsOfSpeechArray.length)],
            targetScore: Math.floor(Math.random() * (15 - 7)) + 7
            //generate new randomPOS and targetScore
        });
        


    };

    restartGame = () => {
        //reload page
    };

    



    render() {
        return (
            <div>
                <Row>
                    <h1 className="text-center">HyperWord 2</h1>
                </Row>
                <Row>
                    <h3 className="text-center">
                    Fill in the blanks with letters that add up to the target score. Your word must match the part of speech as well!
                    </h3>
                </Row>
                <Row className="text-center">
                    <CurrentLevel level={this.state.level} />
                </Row>
                <Row className="text-center">
                    <TotalUserScore totalUserScore={this.state.totalUserScore} />
                </Row>
                <Row className="text-center">
                    <PartOfSpeech POS={this.state.randomPOS} />
                </Row>
                <Row className="text-center">
                    <TargetScore targetScore={this.state.targetScore} />
                </Row>
                <Row className="text-center">
                    <Timer seconds={this.state.secondsLeft}/>
                </Row>
                <Row className="text-center">
                    <AnswerSpace guesses={this.state.lettersGuessedArray.join("")}/>
                </Row>
                <Row className="text-center">
                    <UserScore score={this.state.userScore}/>
                </Row>
                <Row className="text-center">
                <Keyboard letterClick={this.letterClick} clear={this.clear} backspace={this.backspace} submit={this.submit} />
                </Row>
                <br />
                <br />
                <Row className="text-center">
                <NewGameBtn />
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