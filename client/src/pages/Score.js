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
    };
    
    componentDidMount() {
        HiScore.getUserName()
          .then(res => this.setState({ username: res.data.message }))
          .catch(err => console.log(err));
        HiScore.getRoundsCompleted()
          .then(res => this.setState({ roundsCompleted: res.data.message }))
          .catch(err => console.log(err));
        HiScore.getScore()
          .then(res => this.setState({ score: res.data.message }))
          .catch(err => console.log(err));
      }

    handleInputChange = event => {
        this.setState({ username: event.target.value });
    };

    clickButton = () => {
        this.setState({ score: this.state.score + 1});
    }
    
    render() {
        return (
            <div>
                <Container>
                    <Leaderboard 
                    score={this.state.score}
                    />
                    <Username 
                    handleInputChange={this.handleInputChange}
                    username={this.state.username}
                    />
                    <button className="btn btn-primary" onClick={this.clickButton}>score</button>
                    <p>{this.state.rank}</p>
                    <p>{this.state.username}</p>
                    <p>{this.state.roundsCompleted}</p>
                    <p>{this.state.score}</p>
                </Container>
            </div>
        )
    }
}

export default Score;