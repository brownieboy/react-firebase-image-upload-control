import React, {useState} from "react";
// import withFirebaseAuth from "react-with-firebase-auth";
// import * as firebase from "firebase/app";
// import "firebase/auth";
import UserForm from "./UserForm";

const Login = ({
  auth,
  browserSessionPersistence,
  signInWithEmailAndPassword,
  loginCallback,
  setPersistence,
  signOut,
  user
}) => {
  const [lastLoginMessage, setLastLoginMessage] = useState(null);

  const handleSignInWithEmailAndPassword = async (email, password) => {
    // const loginButtonValue = e.target.value;
    let newSignInResult;
    try {
      await setPersistence(auth, browserSessionPersistence);
      newSignInResult = await signInWithEmailAndPassword(auth, email, password);
      setLastLoginMessage(`Last signed in as ${newSignInResult?.user?.email}`);
    } catch (e) {
      setLastLoginMessage(e);
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
    setLastLoginMessage("Logged out");
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
        <button onClick={handleSignOut}>Sign out</button>
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
