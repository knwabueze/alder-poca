import firebase from 'firebase'

var config = {
    apiKey: "AIzaSyCHKRyokxjNJb37KvbGlc6AyhJN5F4iQhQ",
    authDomain: "alder-poca.firebaseapp.com",
    databaseURL: "https://alder-poca.firebaseio.com",
    projectId: "alder-poca",
    storageBucket: "alder-poca.appspot.com",
    messagingSenderId: "92072076661"
  };

firebase.initializeApp(config);

export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const githubProvider = new firebase.auth.GithubAuthProvider();
export const db = firebase.database();