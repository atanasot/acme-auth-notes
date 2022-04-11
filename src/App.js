import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { attemptLogin, logout } from "./store";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./Home";
import Notes from "./Notes";
import SignIn from "./SignIn";

class App extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     auth: {},
  //   };
  // }

  // this gets called after render()
  componentDidMount() {
    this.props.attemptLogin(); // when app loads we attempt to login the user
  }

  componentDidUpdate(prevProps) {
    // this will tell us if user is logged in / we added this
    if (!prevProps.auth.id && this.props.auth.id) {
      console.log("user just logged in");
      // this.setState({
      //   auth: this.props.auth,
      // });
    }
  }

  render() {
    const { auth } = this.props;
    console.log(auth);

    if (!auth.id) {
      return (
        <Switch>
          <Route path="/signin" component={SignIn} />
          <Redirect to="/signin" /> {/* forced to redirect */}
        </Switch>
      );
    } else {
      return (
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/notes" component={Notes} />
          <Redirect to="/home" />
        </Switch>
      );
    }
  }
}

const mapState = (state) => state;
const mapDispatch = (dispatch) => {
  return {
    attemptLogin: () => {
      return dispatch(attemptLogin());
    },
  };
};

export default connect(mapState, mapDispatch)(App);
