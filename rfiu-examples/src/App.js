import React, { useState } from "react";
import "./App.css";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import withFirebaseAuth from "react-with-firebase-auth";
import _isEmpty from "lodash/fp/isEmpty";

import MyModule from "./component/index.js";
import UserForm from "./UserForm";

// You must supply this!
import firebaseConfigObj from "./firebaseconfig/firebase-config.json";

const firebaseApp = firebase.initializeApp(firebaseConfigObj);
const firebaseAppAuth = firebaseApp.auth();

const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider()
};

// console.log(whatever);

const App = ({ loading, signInWithEmailAndPassword, signOut, user }) => {
  console.log("TCL: App -> loading", loading);
  const [signInResult, setSignInResult] = useState({});

  const handleSignInWithEmailAndPassword = async (email, password ) => {
    const newSignInResult = await signInWithEmailAndPassword(email, password);
    setSignInResult(newSignInResult);
    console.log("TCL: App -> newSignInResult", newSignInResult);
  };

  return (
    <div className="App">
      <h1>My Module Test</h1>
      {/* <MyModule /> */}
      {user ? <h1>Hello, {user.displayName}</h1> : <h1>Log in</h1>}

      {user ? (
        <button onClick={signOut}>Sign out</button>
      ) : (
        <>
          <h3>Sign in</h3>
          <UserForm onSubmit={handleSignInWithEmailAndPassword} />
        </>
      )}

      {/* {loading && <h2>Loading..</h2>} */}
      <div style={{marginTop: 20}}>
        <b>Last sign-in message:</b>
        <div style={{ fontSize: 11 }}>
          {_isEmpty(signInResult) ? "No logins yet.." : signInResult.message}
        </div>
      </div>
    </div>
  );
};

export default withFirebaseAuth({
  providers,
  firebaseAppAuth
})(App);
