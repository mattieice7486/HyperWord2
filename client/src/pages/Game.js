import React, { Component } from "react";
import Firebase, { auth, provider } from '../utils/Firebase';
import firebase from 'firebase';
import Keyboard from "../components/Keyboard";
import Row from "../components/Row";
import Col from "../components/Col";
import Container from "../components/Container";
import Timer from "../components/Timer";
import AnswerSpace from "../components/AnswerSpace";
import UserScore from "../components/UserScore"; //for this round
import TargetScore from "../components/TargetScore";
import PartOfSpeech from "../components/PartOfSpeech";
import NewGameBtn from "../components/NewGameBtn";
import CurrentLevel from "../components/CurrentLevel";
import TotalUserScore from "../components/TotalUserScore";

class Game extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      userround: 0,
      userscore: 0,
      username: '',
      items: [],
      user: null,
      // randomPOS: this.partsOfSpeechArray[Math.floor(Math.random() * this.partsOfSpeechArray.length)],
      // partsOfSpeechArray: Object.values(this.partsOfSpeech),
      // abbreviatedPOSArray: Object.keys(this.partsOfSpeech),
      // targetScore: Math.floor(Math.random() * (15 - 7)) + 7,
      // POSIndex: this.partsOfSpeechArray.indexOf(this.state.randomPOS),
      // abbreviatedRandomPOS: this.abbreviatedPOSArray[this.POSIndex],
      lettersGuessedArray: [],
      runningScoreArray: [],
      //wins: 0,
      level: 1,
      userScore: 0, //should update on click of letter, not just on click of submit
      totalUserScore: 0,
      secondsLeft: 60,
      timer: null
    }
    this.handleChange = this.handleChange.bind(this); 
    this.handleSubmit = this.handleSubmit.bind(this); 
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }
  partsOfSpeech = {
    "n.": "noun",
    "a.": "adjective",
    "v.": "verb", //add transitive verb, etc.
    "t.v.": "verb"
  };
  componentDidMount(){
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
          score: items[item].score
        });
      }
      this.setState({
        items: newState
      });
    });
  }
  timeOut = () => {
    var newSecondsCount = this.state.secondsLeft;
    newSecondsCount--;
    this.setState({
        secondsLeft: newSecondsCount
    });
};



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
    const itemsRef = firebase.database().ref('Users');
    const item = {
      user: this.state.username,
      round: this.state.userround,
      score: this.state.userscore
    }
    itemsRef.push(item);
    this.setState({
      username: '',
      userround: 0,
      userscore: 0
    });
  }

   
  
    render() {
      return (
        <div>
          <Container>
              <Row>
                  <h1 className="text-center">HyperWord 2</h1>
              </Row>
              <Row>
                  <h3 className="text-center">
                  Fill in the blanks with letters that add up to the Target score.
                          Your word must match the part of speech as well!
                  </h3>
              </Row>
              {this.state.user ?
                <button onClick={this.logout}>Logout</button>                
              :
                <button onClick={this.login}>Log In</button>              
              }
              {this.state.user ?
                <div>
                  <div className='user-profile'>
                    <img src={this.state.user.photoURL} />
                  </div>
                </div>
                :
                <div className='wrapper'>
                  <p>You must be logged in to record your high score.</p>
                </div>
              }
              <div className='container'>
                <section className='add-item'>
                      <form onSubmit={this.handleSubmit}>
                        <input type="text" name="username" placeholder="user name" onChange={this.handleChange} value={this.state.username} />
                        <input type="number" name="userround" placeholder="round" onChange={this.handleChange} value={this.state.userround} />
                        <input type="number" name="userscore" placeholder="score" onChange={this.handleChange} value={this.state.userscore} />
                        <button>Add Item</button>
                      </form>
                </section>
              </div>
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
            </Container>
        </div>
      );
    }
  }
  
  export default Game;