import React, { Component, Fragment } from "react";
import Keyboard from "../components/Keyboard";
import Row from "../components/Row";
import Col from "../components/Col";
import Container from "../components/Container";
import Firebase, { auth, provider } from '../utils/Firebase';
import firebase from 'firebase';
import "./App.css";

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userround: 0,
      userscore: 0,
      username: '',
      items: [],
      user: null
    }
    this.handleChange = this.handleChange.bind(this); 
    this.handleSubmit = this.handleSubmit.bind(this); 
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

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

  componentDidMount(){
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
   
  
    render() {
      return (
        <div>
          <Container>
          <Fragment>
              <Row>
               <h1 className="header animated fadeInUp" >HyperWord 2</h1>
                 
              </Row>

              <Row>
                  <h3 className="h3 animated fadeInDown">
                  Fill in the blanks with letters that add up to the Target score.
                          Your word must match the part of speech as well!
                  </h3>
              </Row>
              {this.state.user ?
                <button className="logout" onClick={this.logout}>Logout</button>                
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
              <Keyboard />
              </Fragment>
            </Container>
        </div>
      );
    }
  }
  
  export default Game;