import React, { Component } from "react";
import Keyboard from "../components/Keyboard";
import Row from "../components/Row";
import Col from "../components/Col";
import Timer from "../components/Timer";
import AnswerSpace from "../components/AnswerSpace";

//PUT ALL FUNCTIONALITY IN HERE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//each pupster card = the word that the user is guessing (AnswerSpace?)
//green thumb = user got correct word
//red thumb = user got it wrong

//should these functions be contained in an object??




class Game extends Component {

    partsOfSpeech = { "n.": "noun", "a.": "adjective", "v.": "verb" };
    partsOfSpeechArray = Object.values(this.partsOfSpeech);
    abbreviatedPOSArray = Object.keys(this.partsOfSpeech);

    state = {
        randomPOS: this.partsOfSpeechArray[Math.floor(Math.random() * this.partsOfSpeechArray.length)],
        targetScore: Math.floor(Math.random() * (15 - 7)) + 7,
        lettersGuessedArray: [],
        letterGuessed: "",
        letterScore: 0,
        runningScoreArray: [],
        wins: 0,
        userScore: 0
    };

    POSIndex = this.partsOfSpeechArray.indexOf(this.state.randomPOS);
    abbreviatedRandomPOS = this.abbreviatedPOSArray[this.POSIndex];

    letterClick = (event) => { //letter click function
        event.preventDefault();
        let letterGuessed = event.target.attributes.getNamedItem("value").value; //how push to screen??
        let letterScore = event.target.attributes.getNamedItem("datavalue").value;
        console.log("letter: " + letterGuessed);
        console.log("score: " + letterScore);
        //not adding to array, just replacing with each new letter!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        (this.state.lettersGuessedArray).push(letterGuessed);
        console.log("new letter array: " + this.state.lettersGuessedArray);
        //this.setState({lettersGuessedArray}); //is this creating a new state element called newLetterArray, or is it changing lettersGuessedArray?? I think the first???
        (this.state.runningScoreArray).push(letterScore);
        console.log("new score array: " + this.state.runningScoreArray);
        //const newState = { ...this.state }; //cloning current state to set state of component
        //this.setState({newState});
        //how to push newState & letter value to screen??
    };

    clear = (event) => { //////////////////////////////////////////////////
        event.preventDefault();
        console.log("clear clicked!");
        this.state.lettersGuessedArray.length = 0;
        this.state.runningScoreArray = [];
        console.log(this.state.lettersGuessedArray);
        console.log(this.state.runningScoreArray);
        // var blankLetterArray = [];
        // var blankScoreArray = [];
        // this.setState({ blankScoreArray, blankLetterArray });
    };

    backspace = (event) => { //update this
        event.preventDefault();
        console.log("backspace clicked!");
        //find last item in LettersGuessedArray and delete it from array and screen
        this.state.lettersGuessedArray.pop();
        console.log("new backspaced letter array: " + this.state.lettersGuessedArray);
        //console.log("letters guessed array: " + this.state.lettersGuessedArray);
        //update lettersGuessedArray by removing the last item in the array, and then reset state
        this.state.runningScoreArray.pop();
        console.log("new backspaced score array: " + this.state.runningScoreArray);
        // this.setState({
        //     lettersGuessedArray: newLetterArray,
        //     runningScoreArray: newScoreArray
        // });
    };

    submit = (event) => {
        //need if-then win/loss logic here
        //need to calculate total word score
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
                    {/* <Timer secondsLeft={"not working"}/> */}
                </Row>
                <Row className="text-center">
                    <AnswerSpace message={"working"}/>
                </Row>
                <Row className="text-center">
                <Keyboard letterClick={this.letterClick} clear={this.clear} backspace={this.backspace} submit={this.submit} />
                </Row>
            </div>
        );
    };
        
};

//backspace and clear are console logging!!

    
  
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




// class Game extends Component {
    
//     //need to account for other abbreviations too (e.g., "v.t.")
//     //whatever goes on the first line isn't being read, so it's a problem with the entire Game object???????????????????????????????

//     partsOfSpeech = { "n.": "noun", "a.": "adjective", "v.": "verb" };
//     partsOfSpeechArray = Object.values(this.partsOfSpeech); //array of POS
//     abbreviatedPOSArray = Object.keys(this.partsOfSpeech); //array of abbreviated POS
//     POSIndex = this.partsOfSpeechArray.indexOf(this.state.randomPOS);
//     abbreviatedRandomPOS = this.abbreviatedPOSArray[this.POSIndex];
//     // var newScore = 0;
    
//     state = {
//       randomPOS: this.partsOfSpeechArray[Math.floor(Math.random() * this.partsOfSpeechArray.length)],
//       targetScore: Math.floor(Math.random() * (15 - 7)) + 7, //should this go inside state or no?????????????
//       lettersGuessedArray: [], //need to print to screen!
//       letterGuessed: "", //??
//       runningScoreArray: [], //need to print to screen!
//       wins: 0, //need to print to screen!
//       userScore: 0,
//     };

//     //ON LOAD, when the component mounts (is added to page/tree), load the next dog to be displayed
//     // componentDidMount() {
//     // //   this.loadNextDog(); //load next word?
//     // };
  
//     letterClick = (event) => { //on letter click function
//         event.preventDefault();
//         let letterGuessed = event.target.attributes.getNamedItem("datavalue").value; //////////////////////
//         //lettersGuessedArray.push(letterGuessed);
//         //return new array with new letter guessed (concat)////////////////////
//         const newLettersGuessedArray = [...this.state.lettersGuessedArray, letterGuessed];
//         console.log("new letter array: " + newLettersGuessedArray);
//         this.setState(newLettersGuessedArray);
//         //need to define answerSpace component and pass props to render lettersGuessed???????????????????
//         //$(".answerSpace").html = lettersGuessedArray.join(" "); //rename container?????
//         const newState = { ...this.state }; //cloning current state to set state of letter component
//     };

//     clear = (event) => {
//         event.preventDefault();
//         let lettersGuessedArray = [];
//         let runningScoreArray = [];
//     };

//     submit = (event) => {

//     };

//     backspace = (event) => { //update this
//         //look at state.
//         // $("#backspace").on("click", function () { //need to convert this
//         //     //cycle through word and find last item that's not a "_"
//         //     for (var i = lettersGuessedArray.length - 1; i < lettersGuessedArray.length; i--) {
//         //         if (lettersGuessedArray[i] != "_ ") {
//         //             lettersGuessedArray.splice(i, 1, "_ ");
//         //             $(".answerSpace").html(lettersGuessedArray);
//         //             return;
//         //         }
//         //     }
//         // });
//     };





      
//     render() {
//         return (
//           <div>
//               <Row>
//                   <h1 className="text-center">HyperWord 2</h1>
//               </Row>
//               <Row>
//                   <h3 className="text-center">
//                   Fill in the blanks with letters that add up to the Target score.
//                           Your word must match the part of speech as well!
//                   </h3>
//               </Row>
//               <Row>
//                   <Timer />
//               </Row>
//               <Row>
//                   <AnswerSpace />
//                 </Row>
//               <Row>
//               <Keyboard>
//               </Keyboard>
//               </Row>
//           </div>
//         );
//       };

//     };
    
    export default Game;
    

    // handleBtnClick = event => {
    //   // Get the data-value of the clicked button
    //   const btnType = event.target.attributes.getNamedItem("data-value").value;
    //   // Clone this.state to the newState object
    //   // We'll modify this object and use it to set our component's state
    //   const newState = { ...this.state }; //what does this syntax mean????????????????????????????????
  
    //   if (btnType === "pick") { //if correct answer
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
    // //   this.loadNextDog();
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
