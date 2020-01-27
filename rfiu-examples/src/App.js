import React, { useState } from "react";
import "./App.css";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import withFirebaseAuth from "react-with-firebase-auth";

import UploadImages from "./UploadImages";
import Login from "./Login";

// You must supply this!
import firebaseConfigObj from "./firebaseconfig/firebase-config.json";
const firebaseApp = firebase.initializeApp(firebaseConfigObj);
const firebaseAppAuth = firebaseApp.auth();

const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
  githubProvider: new firebase.auth.GithubAuthProvider(),
  twitterProvider: new firebase.auth.TwitterAuthProvider(),
  facebookProvider: new firebase.auth.FacebookAuthProvider()
};

const App = props => {
  return (
    <div className="App">
      <h1>React Firebase Image Uploader Test</h1>
      <Login {...props} />
      <div style={{ marginTop: 40 }}>
        <UploadImages firebaseApp={firebaseApp} />
      </div>
    </div>
  );
};

export default withFirebaseAuth({
  providers,
  firebaseAppAuth
})(App);
