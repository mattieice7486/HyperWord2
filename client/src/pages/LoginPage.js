import React from 'react';
import OktaSignIn from '@okta/okta-signin-widget';
import Backbone from 'backbone';
import firebase from 'firebase';

export default class LoginPage extends React.Component{
  constructor(){
    super();
    this.state = { user: null };
    this.widget = new OktaSignIn({
      baseUrl: 'https://dev-214330.oktapreview.com',
      clientId: '0oafwd412b1CISdha0h7',
      redirectUri: 'http://localhost:3000'
    });

    this.showLogin = this.showLogin.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount(){
    console.log('componentDidMount...');
    this.widget.session.get((response) => {
      if(response.status !== 'INACTIVE'){
        this.setState({user:response.login});
      }else{
        this.showLogin();
      }
    });
  }

  showLogin(){
    console.log('showLogin...')
    Backbone.history.stop();
    this.widget.renderEl({el:this.loginContainer}, 
      (response) => {        
        this.setState({user: response.claims.email});
        this.widget.remove();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  logout(){
    console.log('logout...');
    this.widget.signOut(() => {
      this.setState({user: null});
      this.showLogin();
    });


  // var actionCodeSettings = {
  //   // URL you want to redirect back to. The domain (www.example.com) for this
  //   // URL must be whitelisted in the Firebase Console.
  //   url: 'https://www.example.com/finishSignUp?cartId=1234',
  //   // This must be true.
  //   handleCodeInApp: true,
  //   iOS: {
  //     bundleId: 'com.example.ios'
  //   },
  //   android: {
  //     packageName: 'com.example.android',
  //     installApp: true,
  //     minimumVersion: '12'
  //   }
  // };
  
  // firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings)
  //   .then(function() {
  //     // The link was successfully sent. Inform the user.
  //     // Save the email locally so you don't need to ask the user for it again
  //     // if they open the link on the same device.
  //     window.localStorage.setItem('emailForSignIn', email);
  //   })
  //   .catch(function(error) {
  //     // Some error occurred, you can inspect the code: error.code
  //   });
  
  //   // Confirm the link is a sign-in with email link.
  // if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
  //   // Additional state parameters can also be passed via URL.
  //   // This can be used to continue the user's intended action before triggering
  //   // the sign-in operation.
  //   // Get the email if available. This should be available if the user completes
  //   // the flow on the same device where they started it.
  //   var email = window.localStorage.getItem('emailForSignIn');
  //   if (!email) {
  //     // User opened the link on a different device. To prevent session fixation
  //     // attacks, ask the user to provide the associated email again. For example:
  //     email = window.prompt('Please provide your email for confirmation');
  //   }
  //   // The client SDK will parse the code from the link for you.
  //   firebase.auth().signInWithEmailLink(email, window.location.href)
  //     .then(function(result) {
  //       // Clear email from storage.
  //       window.localStorage.removeItem('emailForSignIn');
  //       // You can access the new user via result.user
  //       // Additional user info profile not available via:
  //       // result.additionalUserInfo.profile == null
  //       // You can check if the user is new or existing:
  //       // result.additionalUserInfo.isNewUser
  //     })
  //     .catch(function(error) {
  //       // Some error occurred, you can inspect the code: error.code
  //       // Common errors could be invalid email and invalid or expired OTPs.
  //     });
  // }
  
  // // Construct the email link credential from the current URL.
  // var credential = firebase.auth.EmailAuthProvider.credentialWithLink(
  //   email, window.location.href);
  
  // // Link the credential to the current user.
  // firebase.auth().currentUser.linkAndRetrieveDataWithCredential(credential)
  // .then(function(usercred) {
  //   // The provider is now successfully linked.
  //   // The phone user can now sign in with their phone number or email.
  // })
  // .catch(function(error) {
  //   // Some error occurred.
  // });
  
  // // Construct the email link credential from the current URL.
  // var credential = firebase.auth.EmailAuthProvider.credentialWithLink(
  //   email, window.location.href);
  
  // // Re-authenticate the user with this credential.
  // firebase.auth().currentUser.reauthenticateAndRetrieveDataWithCredential(credential)
  // .then(function(usercred) {
  //   // The user is now successfully re-authenticated and can execute sensitive
  //   // operations.
  // })
  // .catch(function(error) {
  //   // Some error occurred.
  // });
  
  // // After asking the user for their email.
  // var email = window.prompt('Please provide your email');
  // firebase.auth().fetchSignInMethodsForEmail(email)
  //   .then(function(signInMethods) {
  //     // This returns the same array as fetchProvidersForEmail but for email
  //     // provider identified by 'password' string, signInMethods would contain 2
  //     // different strings:
  //     // 'emailLink' if the user previously signed in with an email/link
  //     // 'password' if the user has a password.
  //     // A user could have both.
  //     if (signInMethods.indexOf(
  //             firebase.auth.EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD) != -1) {
  //       // User can sign in with email/password.
  //     }
  //      if (signInMethods.indexOf(
  //              firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD) != -1) {
  //        // User can sign in with email/link.
  //     }
  //   })
  //   .catch(function(error) {
  //     // Some error occurred, you can inspect the code: error.code
  //   });
  
  //   firebase.auth().signOut().then(function() {
  //     // Sign-out successful.
  //   }).catch(function(error) {
  //     // An error happened.
  //   });
  }

  render(){
    console.log('rendering...');
    return(
      <div>
        {this.state.user ? (
          <div className="container">
            <div>Welcome, {this.state.user}!</div>
            <button onClick={this.logout}>Logout</button>
          </div>
        ) : null}
        {this.state.user ? null : (
          <div ref={(div) => {this.loginContainer = div; }} />
        )}
      </div>
    );
  }
}

