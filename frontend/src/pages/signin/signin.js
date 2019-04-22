import { Layout, Form, Icon, Input, Button, Checkbox } from "antd";
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "antd/dist/antd.css";
import "./signin.css";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import { connect } from "react-redux";
import authActions from "../../redux/auth/actions";
import { Mutation } from "react-apollo";
import { SIGNIN } from "../../api/authentication";

const { login } = authActions;
const { Content } = Layout;

class Signin extends Component {
  state = {
    redirectToReferrer: false,
    email: "",
    password: "",
    showError: false,
    errorMessage: "Some Error"
  };

  componentWillReceiveProps(nextProps) {
    if (
      this.props.isLoggedIn !== nextProps.isLoggedIn &&
      nextProps.isLoggedIn === true
    ) {
      this.setState({
        redirectToReferrer: true
      });
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
    if (this.state.showError) {
      this.setState({ showError: false });
    }
    //console.log(token, id, firstName, lastName, role);
    login(token);
  };

  handleError = message => {
    if (!this.state.showError) {
      this.setState({ showError: true });
    }
    this.setState({ errorMessage: message });
  };

  render() {
    const { login } = this.props;
    const {
      redirectToReferrer,
      email,
      password,
      showError,
      errorMessage
    } = this.state;
    if (redirectToReferrer) {
      return <Redirect to={{ pathname: "/home" }} />;
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
            placeholder="Email"
            style={{ margin: "24px 0px 0px 0px" }}
            onChange={e => this.setState({ email: e.target.value })}
          />
          <Input
            prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
            type="password"
            placeholder="Password"
            style={{ margin: "24px 0px" }}
            onChange={e => this.setState({ password: e.target.value })}
          />
          <Checkbox>Remember me</Checkbox>
          <a className="login-form-forgot" href="">
            Forgot password
          </a>
          <Mutation
            mutation={SIGNIN}
            variables={{ email, password }}
            onCompleted={data => {
              this.handleLogin(data.signin);
            }}
            onError={error => {
              this.handleError(error.message.substr(15));
            }}
          >
            {(signin, { loading }) =>
              loading ? (
                <Button
                  type="primary"
                  className="login-form-button"
                  style={{ margin: "10px 0px 5px 0px" }}
                  loading={true}
                >
                  Log in
                </Button>
              ) : (
                <Button
                  type="primary"
                  className="login-form-button"
                  style={{ margin: "10px 0px 5px 0px" }}
                  onClick={signin}
                  loading={false}
                >
                  Log in
                </Button>
              )
            }
          </Mutation>
          {!showError ? null : <p>{errorMessage}</p>}
          Or <a href="/signup">register now!</a>
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
)(Signin);
