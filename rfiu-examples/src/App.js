import React from "react";
import "./App.css";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import withFirebaseAuth from "react-with-firebase-auth";

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
  return (
    <div className="App">
      <h1>My Module Test</h1>
      <MyModule />
      {user ? <h1>Hello, {user.displayName}</h1> : <h1>Log in</h1>}

      {user ? (
        <button onClick={signOut}>Sign out</button>
      ) : (
        <>
          <h3>sign in</h3>
          <UserForm onSubmit={signInWithEmailAndPassword} />
        </>
      )}

      {loading && <h2>Loading..</h2>}
    </div>
  );
};

export default withFirebaseAuth({
  providers,
  firebaseAppAuth
})(App);
