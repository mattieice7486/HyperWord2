import React, { Component } from "react";
import Keyboard from "../components/Keyboard";
import Row from "../components/Row";
import Col from "../components/Col";
import Container from "../components/Container";
import Firebase from '../utils/Firebase';
import firebase from 'firebase';

class Game extends Component {
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
              <Keyboard />
            </Container>
        </div>
      );
    }
  }
  
  export default Game;