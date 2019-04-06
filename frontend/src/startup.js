import React, { Component } from "react";
import { connect } from "react-redux";
import authActions from "./redux/auth/actions";

const { checkAuthorization } = authActions;

class Startup extends Component {
  componentDidMount() {
    this.props.checkAuthorization();
  }
  render() {
    return this.props.children;
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.Auth.idToken !== null
});

const mapDispatchToProps = {
  checkAuthorization
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Startup);
