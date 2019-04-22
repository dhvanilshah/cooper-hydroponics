import { Layout, Form, Icon, Input, Button, Checkbox } from "antd";
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "antd/dist/antd.css";
import "./signup.css";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import { connect } from "react-redux";
import authActions from "../../redux/auth/actions";
import { Mutation } from "react-apollo";
import { SIGNUP } from "../../api/authentication";

const { login } = authActions;
const { Content } = Layout;

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToReferrer: false,
      redirectToSignin: false,
      showError: false,
      errorMessage: "Some Error",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConf: ""
    };
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.isLoggedIn !== nextProps.isLoggedIn &&
      nextProps.isLoggedIn === true
    ) {
      this.setState({ redirectToReferrer: true });
    }
  }

  componentDidMount() {
    if (this.props.isLoggedIn == true) {
      this.setState({
        redirectToReferrer: true
      });
    }
  }

  handleLogin = token => {
    const { login } = this.props;
    if (this.state.showError) this.setState({ showError: false });
    login(token);
  };

  handleError = message => {
    if (!this.state.showError) this.setState({ showError: true });
    this.setState({ errorMessage: message });
  };
  render() {
    const { isLoggedIn, login } = this.props;
    const {
      redirectToReferrer,
      redirectToSignin,
      showError,
      errorMessage,
      firstName,
      lastName,
      email,
      password,
      passwordConf
    } = this.state;
    const token = 1;
    if (redirectToReferrer) {
      return <Redirect to={{ pathname: "/home" }} />;
    }
    if (redirectToSignin) {
      return <Redirect to={{ pathname: "/" }} />;
    }
    return (
      <Layout className="layout">
        <Header />
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            background: "#fff",
            minHeight: "80vh",
            alignSelf: "center",
            justifyItems: "space-between"
          }}
          className="login-form"
        >
          <h1 style={{ margin: "24px 0px 0px 0px", textAlign: "center" }}>
            HYDROPONICS
          </h1>
          <Input
            prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="First Name"
            onChange={e => this.setState({ firstName: e.target.value })}
            style={{ margin: "24px 0px 0px 0px" }}
          />
          <Input
            prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Last Name"
            onChange={e => this.setState({ lastName: e.target.value })}
            style={{ margin: "24px 0px 0px 0px" }}
          />
          <Input
            prefix={<Icon type="global" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Email"
            onChange={e => this.setState({ email: e.target.value })}
            style={{ margin: "24px 0px 0px 0px" }}
          />
          <Input
            prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
            type="password"
            placeholder="Password"
            onChange={e => this.setState({ password: e.target.value })}
            style={{ margin: "24px 0px 0px 0px" }}
          />
          <Input
            prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
            type="password"
            placeholder="Confirm Password"
            onChange={e => this.setState({ passwordConf: e.target.value })}
            style={{ margin: "24px 0px" }}
          />
          <Mutation
            mutation={SIGNUP}
            variables={{
              firstName,
              lastName,
              email,
              password
            }}
            onCompleted={data => {
              this.handleLogin(data.signup);
            }}
            onError={error => {
              this.handleError(error.message.substr(15));
            }}
          >
            {(signup, { loading }) =>
              loading ? (
                <Button
                  type="primary"
                  className="login-form-button"
                  style={{ margin: "10px 0px 5px 0px" }}
                  loading={true}
                >
                  Sign Up
                </Button>
              ) : (
                <Button
                  type="primary"
                  className="login-form-button"
                  style={{ margin: "10px 0px 5px 0px" }}
                  onClick={() => {
                    if (password != passwordConf)
                      this.handleError("The passwords do not match");
                    else signup();
                  }}
                >
                  Sign Up
                </Button>
              )
            }
          </Mutation>
          {!showError ? null : (
            <p style={{ marginBottom: "20px" }}>{errorMessage}</p>
          )}
          Or{" "}
          <a onClick={() => this.setState({ redirectToSignin: true })}>
            sign in.
          </a>
        </Content>
        <Footer />
      </Layout>
    );
  }
}

export default connect(
  state => ({
    isLoggedIn: state.Auth.idToken !== null
  }),
  { login }
)(Signup);
