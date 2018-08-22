import React from 'react';
import Container from "../components/Container";

import Firebase, { auth, provider } from '../utils/Firebase';
import firebase from 'firebase';

export default class LoginPage extends React.Component{
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

  render(){
    return(
    
        <div>
          <h1 className="header animated fadeInDown delay 3s text-center">HyperWord 2</h1>


          {this.state.user ?
            <button className="logout" onClick={this.logout}>Logout</button>                
          :
            <button className="login" onClick={this.login}>Log In</button>              
          }
          {this.state.user ?
            <div>
            <div className='user-profile'>
            <img src={this.state.user.photoURL} style={{borderRadius : "50%", height : "50px", width : "auto", position: "absolute", top: "80px", left: "200px"}}/>
            </div>
          </div>
            :
            <div className='wrapper'>
            <p className="animated zoomIn">You must be logged in to record your high score.</p>
        </div>
          }
        </div>
      
    );
  }
}

