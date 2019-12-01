import React from "react";
import "./App.css";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

firebase.initializeApp({
  apiKey: "your api key",
  authDomain: "your auth domain"
});

class App extends React.Component {
  state = {
    isSignedIn: false
  };
  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccessWithAuthResult: () => false
    }
  };

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user });
    });
  };
  render() {
    return (
      <div className="App">
        {this.state.isSignedIn ? (
          <div>
            <button
              style={{ float: "right" }}
              onClick={() => firebase.auth().signOut()}
            >
              Sign Out
            </button>
            <h3>Welcome {firebase.auth().currentUser.displayName}</h3>
            <img src={firebase.auth().currentUser.photoURL} alt="profile" />
            <h4>Email Address: {firebase.auth().currentUser.email}</h4>
          </div>
        ) : (
          <StyledFirebaseAuth
            uiConfig={this.uiConfig}
            firebaseAuth={firebase.auth()}
          />
        )}
      </div>
    );
  }
}

export default App;
