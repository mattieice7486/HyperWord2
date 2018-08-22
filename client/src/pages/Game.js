import React, { Component } from "react";
import axios from "axios";
import firebase from "firebase";
import Firebase, { auth, provider } from '../utils/Firebase';
import Keyboard from "../components/Keyboard";
import Row from "../components/Row";
import Col from "../components/Col";
import Timer from "../components/Timer";
import AnswerSpace from "../components/AnswerSpace";
import UserWordValue from "../components/UserWordValue"; //for this round
import CurrentLevel from "../components/CurrentLevel";
import TotalUserScore from "../components/TotalUserScore";
import Card from "../components/Card";
import { EventEmitter } from "events";



// need subscripts
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



class Game extends Component {

    partsOfSpeech = [
        "noun",
        "verb",
        "adjective"
    ];


    
    constructor(props) {
        super(props);

    this.state = {
        randomPOS: this.partsOfSpeech[Math.floor(Math.random() * this.partsOfSpeech.length)],
        targetScore: Math.floor(Math.random() * (15 - 7)) + 7,
        lettersGuessedArray: [],
        winbtnhidden: true,
        lossbtnhidden: true,
        resultsMessage: "Fill in the blanks with letters that add up to the target score. Your word must match the part of speech as well!",
        runningScoreArray: [],
        level: 1,
        userWordValue: 0,
        totalUserScore: 0,
        scoreThisRound: 0,
        secondsLeft: 15,
        timer: null,
        error: null,
        userround: 0,
        userscore: 0,
        username: '',
        items: [],
        user: null
    };

    this.handleChange = this.handleChange.bind(this); 
    this.handleSubmit = this.handleSubmit.bind(this); 
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
}

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
        auth.onAuthStateChanged((user) => {
            if (user) {
              this.setState({ user });
            } 
          });
          const itemsRef = firebase.database().ref('Users');
          itemsRef.on('value', (snapshot) => {
            let items = snapshot.val();
            let newState = [];
            for (let item in items) {
              newState.push({
                id: item,
                user: items[item].user,
                round: items[item].round,
                score: items[item].score,
                avatar: items[item].avatar,
              });
            }
            this.setState({
              items: newState
            });
          });
    };


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

    win = () => {
        console.log("cool")
        var newWinningScore = this.state.secondsLeft * 10;
        this.setState({ scoreThisRound: newWinningScore });
        //add round's score to total score AND POST TO DB/LEADERBOARD!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        var newTotalScore = this.state.totalUserScore + newWinningScore;
        this.setState({
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
        //this.nextLevel();
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
            lossbtnhidden: false,
            winbtnhidden: true
        });
    };



    submit = (event) => {
        event.preventDefault();
        //disable all buttons!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        var joinedArray = this.state.lettersGuessedArray.join("");
        clearInterval(this.state.timer);

        var thisPOS = this.state.randomPOS;
        //console.log(thisPOS);
//does this.state.randomPOS match the POS from the dictionary?????????????????????????????????????????????????????????????

        function checkForWord() {
            axios.post(`http://localhost:3001/api/check-word`, { guess: joinedArray, POS: thisPOS })
            .then((response) => {
                //console.log("response: " + response);
                if (response.data !== "its a word") {
                    // Set the error state to null (in case there was a previous error and someone resubmited)
                    this.loss();
                } else {
                    //If the guess isn't a word, set the error state
                    //if not found in dictionary (404 error), loss
                    //if part of speech doesn't match, loss!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                    //otherwise, win!!
                    this.loss();
                    
                }
            })
            .catch((error, response) => {
                return;
            });
        };


        if (this.state.userWordValue !== this.state.targetScore) { //SWITCH BACK!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            checkForWord();
            //this.loss(); //SWITCH BACK!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        } else {
            checkForWord();
        };
        

    };


    lostQuit = () => {
        this.setState({
            resultsMessage: "Thanks for playing! Come back soon.",
            lossbtnhidden: true
        });
    };

    wonQuit = () => {
        this.setState({
            winbtnhidden: true,
            resultsMessage: "Thanks for playing! Come back soon."
        });
    };

    nextLevel = () => { //for when user wins and wants to continue to next level
        var newLevel = this.state.level + 1; //show level they're on (update this.state.level)
        let timer = setInterval(this.timeOut, 1000);
        this.setState({
            timer: timer,
            winbtnhidden: true,
            level: newLevel,
            userWordValue: 0,
            resultsMessage: "Fill in the blanks with letters that add up to the target score. Your word must match the part of speech as well!",
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

    handleChange(e) {
        this.setState({
          [e.target.name]: e.target.value
        });
    }

    logout() {
        auth.signOut()
        .then(() => {
          this.setState({
            user: null
          });
        });
       }
    
      login() {
        auth.signInWithPopup(provider) 
          .then((result) => {
            const user = result.user;
            this.setState({
              user
            });
          });
      }
    
      handleSubmit(e) {
        e.preventDefault();
        console.log(this.state.user);
        const itemsRef = firebase.database().ref('Users');
        const item = {
          user: this.state.user.displayName,
          round: this.state.level,
          score: this.state.secondsLeft,
          avatar: this.state.user.photoURL
        }
        itemsRef.push(item);
        this.setState({
          // username: '',
          // userround: 0,
          // userscore: 0
        });
      }



    render() {
        return (
            <div>
                <Row>
                    <h1 className="text-center">HyperWord 2</h1>
                </Row>
                
                <div className='container'>
                {this.state.user ?
                <button onClick={this.logout}>Logout</button>                
              :
                <button onClick={this.login}>Log In</button>              
              }
              
              {this.state.user ?
                <div>
                  <div className='user-profile'>
                    <img src={this.state.user.photoURL} style={{borderRadius : "50%", height : "100px", width : "auto"}}/>
                  </div>
                </div>
                :
                <div className='wrapper'>
                  <p>You must be logged in to record your high score.</p>
                </div>
              }

                <section className='add-item'>
                      <form onSubmit={this.handleSubmit}>
                        <button>Add Item</button>
                      </form>
                </section>
              </div>

                <Row>
                    <Card winbtnstyle={{ display: this.state.winbtnhidden ? "none" : "block" }} lossbtnstyle={{ display: this.state.lossbtnhidden ? "none" : "block" }} winbtnhidden={this.state.winbtnhidden} lossbtnhidden={this.state.lossbtnhidden} imgSrc="https://media.giphy.com/media/SIulatisvJhV7KPfFz/giphy.gif" randomPOS={this.state.randomPOS} targetScore={this.state.targetScore} resultsMessage={this.state.resultsMessage} lostPlayAgain={this.restartGame} wonPlayAgain={this.nextLevel} wonQuit={this.wonQuit} lostQuit={this.lostQuit}>
                    </Card>
                </Row>
                <Row className="text-center">
                    <CurrentLevel level={this.state.level} />
                </Row>
                <Row className="text-center">
                    <TotalUserScore totalUserScore={this.state.totalUserScore} />
                </Row>
                <Row className="text-center">
                    <Timer seconds={this.state.secondsLeft} />
                </Row>
                <Row className="text-center">
                    <AnswerSpace guesses={this.state.lettersGuessedArray.join("")} />
                </Row>
                <Row className="text-center">
                    <UserWordValue score={this.state.userWordValue} />
                </Row>
                <Row className="text-center">
                    <Keyboard letterClick={this.letterClick} clear={this.clear} backspace={this.backspace} submit={this.submit} />
                </Row>
            </div>
        );
    };

};

// <Row className="text-center">
// {this.state.error && <p style={{ color: 'red' }}>Your answer must be a word!</p>}
// </Row>

// axios.post(`http://localhost:3001/api/check-word`, { guess: joinedArray })
// .then((response) => {
//     if (response.data === "its a word") {
//         // Set the error state to null (in case there was a previous error and someone resubmited)
//         return this.setState({
//             error: null
//         })

// return this.setState({
                    //     error: "Your guess must be a valid word"
                    // });

export default Game;