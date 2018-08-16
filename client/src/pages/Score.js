import React, { Component } from "react";
import Leaderboard from "../components/Leaderboard";
import Container from "../components/Container";
import Firebase, { auth, provider } from '../utils/Firebase';
import firebase from 'firebase';
import _ from 'lodash';

class Score extends Component {
    constructor(props) {
      super(props);
      this.state = {
        userround: 0,
        userscore: 0,
        username: '',
        items: []
      }
      this.handleChange = this.handleChange.bind(this); 
      this.handleSubmit = this.handleSubmit.bind(this); 
    }
  
    handleChange(e) {
      this.setState({
        [e.target.name]: e.target.value
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
  
    componentDidMount(){
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
  
    removeItem(itemId) {
      const itemRef = firebase.database().ref(`/Users/${itemId}`);
      itemRef.remove();
    }
    render() {
      return (
        <div className='container'>
          <header>
              <div className="wrapper">
                <h1>Leaderboard</h1>
                               
              </div>
          </header>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Username</th>
                        <th scope="col">Rounds Completed</th>
                        <th scope="col">Score</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.items.map((item) => {
                        return (
                            <tr key={item.id}>
                                <td>{item.id}<button onClick={() => this.removeItem(item.id)}>Remove Item</button></td>
                                <td>{item.user}</td>
                                <td>{item.round}</td>
                                <td>{item.score}</td>
                            </tr>
                        )                
                    })}
                </tbody>
            </table>
        </div>
      );
    }
  }
  
  export default Score;