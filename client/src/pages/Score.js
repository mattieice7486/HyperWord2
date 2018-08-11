import React, { Component } from "react";

import Leaderboard from "../components/Leaderboard";
import KeyboardLetter from "../components/KeyboardLetter";
import Container from "../components/Container";

class Score extends Component {
    state = {
      username: "",
      roundsCompleted: 0,
      Score: 0,
    };

    clickButton () {
        
    }
    
    render() {
        return (
            <div>
                <Container>
                    <Leaderboard />
                    <KeyboardLetter />
                </Container>
            </div>
        )
    }
}

export default Score;