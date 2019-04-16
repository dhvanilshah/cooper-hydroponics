import React, { Component } from "react";
import {
  Route,
  Redirect,
  Switch,
  BrowserRouter as Router
} from "react-router-dom";
import authActions from "./redux/auth/actions";
import { connect } from "react-redux";
import Signin from "./pages/signin/signin";
import Signup from "./pages/signinup/signup";
import Home from "./pages/home/home";
import AddFarm from "./pages/addfarm/addfarm";
import AddSystem from "./pages/addsystem/addsystem";

const { checkAuthorization } = authActions;

const RestrictedRoute = ({ component: Component, isLoggedIn, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isLoggedIn ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

const PublicRoutes = ({ isLoggedIn }) => {
  return (
    <Router>
      <Switch>
        <Route exact path={"/"} component={Signin} />
        <Route exact path={"/signup"} component={Signup} />
        {/* <Route
          exact
          path={"/signin"}
          component={asyncComponent(() => import("./containers/Page/signin"))}
        />
        <Route
          exact
          path={"/signup"}
          component={asyncComponent(() => import("./containers/Page/signup"))}
        /> */}
        <RestrictedRoute
          path="/home"
          component={Home}
          isLoggedIn={isLoggedIn}
        />
        <RestrictedRoute
          path="/addfarm"
          component={AddFarm}
          isLoggedIn={isLoggedIn}
        />
        <RestrictedRoute
          path="/addsystem"
          component={AddSystem}
          isLoggedIn={isLoggedIn}
        />
      </Switch>
    </Router>
  );
};

export default connect(
  state => ({
    isLoggedIn: state.Auth.idToken !== null
  }),
  { checkAuthorization }
)(PublicRoutes);
