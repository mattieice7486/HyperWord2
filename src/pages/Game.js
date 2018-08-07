import React, { Component } from "react";
import Keyboard from "../components/Keyboard";
import Row from "../components/Row";
import Col from "../components/Col";

class Game extends Component {
    state = {
      image: "",
      match: false,
      matchCount: 0
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
  
    render() {
      return (
        <div>
            <Row>
                <h1 className="text-center">HyperWord 2</h1>
            </Row>
            <Row>
                <h3 className="text-center">
                Fill in the blanks with letters that add up to the Target score.
                        Your word must match the part of speech as well!
                </h3>
            </Row>
            <Keyboard>
            </Keyboard>
        </div>
      );
    }
  }
  
  export default Game;