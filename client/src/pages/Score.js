import React, { Component } from "react";
import HiScore from "../utils/HiScore";
import Leaderboard from "../components/Leaderboard";
import Container from "../components/Container";
import Username from "../components/Username";

class Score extends Component {
    state = {
        rank: 0,
        username: "",
        roundsCompleted: 0,
        score: 0,
        userArray: []
    };
    
    componentDidMount() {
        this.setState({ userArray: HiScore });
        // HiScore.getUserName()
        //   .then(res => this.setState({ username: res.data.message }))
        //   .catch(err => console.log(err));
        // HiScore.getRoundsCompleted()
        //   .then(res => this.setState({ roundsCompleted: res.data.message }))
        //   .catch(err => console.log(err));
        // HiScore.getScore()
        //   .then(res => this.setState({ score: res.data.message }))
        //   .catch(err => console.log(err));
    }

    handleInputChange = event => {
        this.setState({ username: event.target.value });
    };

    clickButton = () => {
        this.setState({ rank: this.state.rank + 1});
        this.setState({ roundsCompleted: this.state.roundsCompleted + 1});
        this.setState({ score: this.state.score + 10});
    }
    
    render() {
        return (
            <div>
                <Container>
                    <Leaderboard 
                    rank={this.state.rank}
                    score={this.state.score}
                    username={this.state.username}
                    roundsCompleted={this.state.roundsCompleted}
                    userArray={this.state.userArray}
                    />
                    <button className="btn btn-primary" onClick={this.clickButton}>score</button>
                    <Username 
                    handleInputChange={this.handleInputChange}
                    username={this.state.username}
                    />
                </Container>
            </div>
        )
    }
}

export default Score;