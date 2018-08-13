import React, { Component } from 'react';
import fire from '../utils/Firebase';
import Hero from "../components/Hero";
import Container from "../components/Container";
import Row from "../components/Row";
import Col from "../components/Col";

// const About = () => (
//   <div>
//     <Hero backgroundImage="https://i.imgur.com/qkdpN.jpg">
//       <h1>HyperWord</h1>
//       <h2>Create an Account</h2>
//     </Hero>
//     <Container style={{ marginTop: 30 }}>
//       <Row>
//         <Col size="md-12">
//           <h1>Welcome To HyperWord!</h1>
//         </Col>
//       </Row>
 
//     </Container>
//   </div>
// );

// export default About;



class App extends Component {
  constructor(props) {
    super(props);
    this.state = { messages: [] }; // <- set up react state
  }
  componentWillMount(){
    /* Create reference to messages in Firebase Database */
    // let messagesRef = fire.database().ref('messages').orderByKey().limitToLast(100);
    // messagesRef.on('child_added', snapshot => {
    //   /* Update React state when message is added at Firebase Database */
    //   let message = { text: snapshot.val(), id: snapshot.key };
    //   this.setState({ messages: [message].concat(this.state.messages) });
    // })
  }
  addMessage(e){
    e.preventDefault(); // <- prevent form submit from reloading the page
    /* Send the message to Firebase */
    fire.database().ref('messages').push( this.inputEl.value );
    this.inputEl.value = ''; // <- clear the input
  }
  render() {
    return (
      <form onSubmit={this.addMessage.bind(this)}>
        <input type="text" ref={ el => this.inputEl = el }/>
        <input type="submit"/>
        <ul>
          { /* Render the list of messages */
            this.state.messages.map( message => <li key={message.id}>{message.text}</li> )
          }
        </ul>
      </form>
    );
  }
}

export default App;