import React, { Component } from "react";
import axios from "axios";
import firebase from "firebase";
import Firebase, { auth, provider } from '../utils/Firebase';
import Keyboard from "../components/Keyboard";
import Row from "../components/Row";
import Col from "../components/Col";
import Timer from "../components/Timer";
import AnswerSpace from "../components/AnswerSpace";
import UserWordValue from "../components/UserWordValue";
import CurrentLevel from "../components/CurrentLevel";
import TotalUserScore from "../components/TotalUserScore";
import Card from "../components/Card";
import { EventEmitter } from "events";
var wordList = require("categorized-words");



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
        secondsLeft: 30,
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
    this.handleSubmit = this.handleSubmit.bind(this);
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

    componentDidMount() {
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
        var newWinningScore = this.state.secondsLeft * 10;
        this.setState({ scoreThisRound: newWinningScore });
        var newTotalScore = this.state.totalUserScore + newWinningScore;
        this.setState({
            winbtnhidden: false,
            totalUserScore: newTotalScore,
            resultsMessage: "Congratulations! You scored " + newWinningScore + ". Your total score  is " + newTotalScore + " points. Play again?"
        });
    };


    loss = () => {
        this.setState({
            resultsMessage: "Sorry, you lost!",
            lossbtnhidden: false,
            winbtnhidden: true
        });
        this.handleSubmit();
    };


    submit = (event) => {
        event.preventDefault();
        var joined = this.state.lettersGuessedArray.join("");
        var joinedArray = joined.toLowerCase();
        clearInterval(this.state.timer);
        var thisPOS = this.state.randomPOS[0].toUpperCase();
        if (this.state.userWordValue !== this.state.targetScore) {
            this.loss();
        } else {
            if (thisPOS == "A") {
                var AList = wordList.A;
                var AIndex = AList.indexOf(joinedArray);
                if (AIndex > -1) {
                    this.win();
                } else {
                    this.loss();
                }
            } else if (thisPOS == "V") {
                var VList = wordList.V;
                var VIndex = VList.indexOf(joinedArray);
                if (VIndex > -1) {
                    this.win();
                } else {
                    this.loss();
                }
            } else if (thisPOS == "N") {
                var NList = wordList.N;
                var NIndex = NList.indexOf(joinedArray);
                if (NIndex > -1) {
                    this.win();
                }
                else {
                    this.loss();
                }
            };
        }
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
        this.handleSubmit();
    };

    nextLevel = () => {
        var newLevel = this.state.level + 1;
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
            secondsLeft: 30,
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
     };
  
    login() {
      auth.signInWithPopup(provider) 
        .then((result) => {
          const user = result.user;
          this.setState({
            user
          });
        });
    };
  
    handleSubmit(e) {
      const itemsRef = firebase.database().ref('Users');
      if (this.state.user !== null) {
        const item = {
            user: this.state.user.displayName,
            round: this.state.level,
            score: this.state.totalUserScore,
            avatar: this.state.user.photoURL
        }
        itemsRef.push(item);
      };
    };



    render() {
        return (
            <div>
                <Row>

                <div>
                    {this.state.user ?
                    <button className="logout" onClick={this.logout}>Logout</button>                
                    :
                    <button className="login" onClick={this.login}>Log In</button>              
                    }

            <Row className="level text-center animated wobble delay 3s">
                    <CurrentLevel level={this.state.level} />
            </Row>      

                    {this.state.user ?
                        <div className>
                            <img className="us" src={this.state.user.photoURL} style={{borderRadius : "50%", height : "100px", width : "auto"}}/>
                        </div>
                        :
                        <p>You must be logged in to record your high score.</p>
                    }
                </div>
            </Row>
                <Row>
                    <Card
                        winbtnstyle={{display: this.state.winbtnhidden? "none" : "block"}}
                        lossbtnstyle={{display: this.state.lossbtnhidden? "none" : "block"}}
                        winbtnhidden={this.state.winbtnhidden}
                        lossbtnhidden={this.state.lossbtnhidden}imgSrc="https://media.giphy.com/media/SIulatisvJhV7KPfFz/giphy.gif"
                        randomPOS={this.state.randomPOS}
                        targetScore={this.state.targetScore}
                        resultsMessage={this.state.resultsMessage}
                        lostPlayAgain={this.restartGame}
                        wonPlayAgain={this.nextLevel}
                        wonQuit={this.wonQuit}
                        lostQuit={this.lostQuit}>
                    </Card>
                </Row>
                <Row>
                <div className="block animated slideInRight delay 3s">
                    <Row className="userScore text-center">
                    <TotalUserScore totalUserScore={this.state.totalUserScore} />
                        <Timer seconds={this.state.secondsLeft}/>
                    </Row>
                    <Row className="answerSpace text-center">
                        <AnswerSpace guesses={this.state.lettersGuessedArray.join("")}/>
                    </Row>
                    <Row className="text-center">
                        <UserWordValue score={this.state.userWordValue}/>
                        </Row>
                </div>
            </Row>
                <Row className="text-center">
                    <Keyboard letterClick={this.letterClick} clear={this.clear} backspace={this.backspace} submit={this.submit} />
                </Row>
            </div>

        );
    };
        
};    


export default Game;