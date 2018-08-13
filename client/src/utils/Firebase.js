import * as admin from 'firebase-admin';
import firebase from 'firebase'

var config = {
    apiKey: "AIzaSyAeNje3Lz-SA6WnqIYHn7PXOtaeTNHICJE",
    authDomain: "hyperword2.firebaseapp.com",
    databaseURL: "https://hyperword2.firebaseio.com",
    projectId: "hyperword2",
    storageBucket: "hyperword2.appspot.com",
    messagingSenderId: "256089197607"
  };
  firebase.initializeApp(config);

  var fire = firebase.database();

  export default fire