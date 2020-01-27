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

const LOGIN_TYPES = [
  { id: "email", label: "Email and password" },
  { id: "google", label: "Google ID" }
];

const App = ({ loading, signInWithEmailAndPassword, signOut, user }) => {
  const [signInResult, setSignInResult] = useState({});
  const [loginType, setLoginType] = useState("email");

  const handleSignInWithEmailAndPassword = async (email, password) => {
    const newSignInResult = await signInWithEmailAndPassword(email, password);
    setSignInResult(newSignInResult);
    console.log("TCL: App -> newSignInResult", newSignInResult);
  };

  const handleChangeLoginType = e => setLoginType(e.target.value);

  return (
    <div className="App">
      <h1>My Module Test</h1>
      {/* <MyModule /> */}
      {user ? <h1>Hello, {user.displayName}</h1> : <h1>Log in</h1>}
      <p>You need to log into Firebase first. Please choose your login type</p>
      {LOGIN_TYPES.map(type => (
        <>
          <label>
            <input
              type="radio"
              value={type.id}
              onChange={handleChangeLoginType}
              name="logintype"
              checked={loginType === type.id}
            />
            {type.label}
          </label>
          <br />
        </>
      ))}
      {user ? (
        <button onClick={signOut}>Sign out</button>
      ) : (
        <>
          <h3>Sign in</h3>
          <UserForm onSubmit={handleSignInWithEmailAndPassword} />
        </>
      )}

      {/* {loading && <h2>Loading..</h2>} */}
      <div style={{ marginTop: 20 }}>
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
