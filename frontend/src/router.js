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

// class PublicRoutes extends Component {
//   componentDidMount() {
//     this.props.checkAuthorization();
//   }
//   render() {
//     const { isLoggedIn } = this.props;
//     return <VisibleRoutes isLoggedIn={isLoggedIn} />;
//   }
// }
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
        {/* <Route exact path={"/home"} component={Home} /> */}
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
