import React, { Component } from "react";
import HiScore from "../utils/HiScore";
import Leaderboard from "../components/Leaderboard";
import Container from "../components/Container";
import Username from "../components/Username";
import _ from 'lodash';

class Score extends Component {
    state = {
        rank: 0,
        username: "",
        roundsCompleted: 0,
        score: 0,
        userArray: [],
        newArray: [0, 4, 3, 5]
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
    };
    sortedArray = () => {
        var i;
        for (i=0;i<this.state.newArray.length;i++) {
            console.log(i);
            // _
            // .chain(this.state.userArray)
            // .sortBy('score')
            // .map(function(o) {
                //     return o.userArray
                // })   
            }
            this.setState({ newArray: this.state.newArray[0] + 1})
            console.log(this.state.newArray)
    };

    handleInputChange = event => {
        this.setState({ username: event.target.value });
    };

    clickButton = () => {
        this.setState({ rank: this.state.rank + 1});
        this.setState({ roundsCompleted: this.state.roundsCompleted + 1});
        this.setState({ score: this.state.score + 10});
        this.setState({ newArray: this.state.newArray[1] + 10});
        console.log(this.state.userArray);
        console.log(this.state.newArray);
        var i;
        for (i=0;i<this.state.userArray.length;i++) {
            console.log(this.state.userArray[i].rank);
            if (this.state.userArray[i].rank > 10) {
                console.log("didn't make the top 10")
            } else {
                console.log("top ten")
            }
        }

    };
    
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
                    <button className="btn btn-primary" onClick={this.sortedArray}>sort</button>
                    <Username 
                    handleInputChange={this.handleInputChange}
                    username={this.state.username}
                    />
                    <p>{_.dropRight(this.state.newArray)}</p>
                    {/* <p>{(this.state.userArray)}</p> */}
                </Container>
            </div>
        )
    }
}

export default Score;