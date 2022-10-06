import React, {useState} from "react";
// import withFirebaseAuth from "react-with-firebase-auth";
// import * as firebase from "firebase/app";
// import "firebase/auth";
import UserForm from "./UserForm";

const Login = ({
  auth,
  signInWithEmailAndPassword,
  loginCallback,
  signOut,
  user
}) => {
  const [lastLoginMessage, setLastLoginMessage] = useState(null);
  console.log(
    "TCL ~ file: Login.js ~ line 15 ~ lastLoginMessage",
    lastLoginMessage
  );

  const handleSignInWithEmailAndPassword = async (email, password) => {
    // const loginButtonValue = e.target.value;
    let newSignInResult;
    try {
      newSignInResult = await signInWithEmailAndPassword(auth, email, password);
      console.log(
        "TCL ~ file: Login.js ~ line 45 ~ handleLoginButtonClick ~ newSignInResult",
        newSignInResult
      );
    } catch (e) {
      console.log(
        "TCL ~ file: Login.js ~ line 21 ~ handleSignInWithEmailAndPassword ~ e",
        e
      );
      setLastLoginMessage(e);
    }
  };

  const getLoginButton = () => {
    return (
      <div>
        <UserForm onSubmit={handleSignInWithEmailAndPassword} />
      </div>
    );
  };

  return (
    <div className="App">
      {user ? (
        <h1>Hello, {user.displayName}</h1>
      ) : (
        <>
          <h1>Log in</h1>
          <p>You need to log into Firebase first.</p>
        </>
      )}
      {user ? (
        <button onClick={signOut}>Sign out</button>
      ) : (
        <>
          <h3>Sign in</h3>
          {getLoginButton()}
        </>
      )}

      {/* {loading && <h2>Loading..</h2>} */}
      <div style={{marginTop: 20}}>
        <b>Last sign-in message:</b>
        <div style={{fontSize: 11}}>
          {lastLoginMessage ? `${lastLoginMessage}` : "No logins messages"}
        </div>
      </div>
    </div>
  );
};

export default Login;
