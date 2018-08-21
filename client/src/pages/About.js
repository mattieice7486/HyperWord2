
import React, { Component } from 'react';
import Firebase, { auth, provider } from '../utils/Firebase';
import firebase from 'firebase';

class App extends Component {
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

  removeItem(itemId) {
    const itemRef = firebase.database().ref(`/Users/${itemId}`);
    itemRef.remove();
  }
  render() {
    return (
      <div className='app'>
        <header>
          <div className="wrapper">
            <h1>Fun Food Friends</h1>
            {this.state.user ?
              <button onClick={this.logout}>Logout</button>                
            :
              <button onClick={this.login}>Log In</button>              
            }
          </div>
        </header>
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
      </div>
    );
  }
}

export default App;