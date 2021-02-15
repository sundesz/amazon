import firebase from 'firebase'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAHojyq2AEU--MQSCEv5ZhaID4paxvuO90",
    authDomain: "challenge-edb99.firebaseapp.com",
    projectId: "challenge-edb99",
    storageBucket: "challenge-edb99.appspot.com",
    messagingSenderId: "504318964847",
    appId: "1:504318964847:web:12ea946a9affc8340ec99a",
    measurementId: "G-JLT7ZFLE2R"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore()
const auth = firebase.auth()

export { db, auth }