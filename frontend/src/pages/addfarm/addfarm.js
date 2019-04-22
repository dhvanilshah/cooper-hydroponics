import { Layout, Form, Icon, Input, Button, Checkbox } from "antd";
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "antd/dist/antd.css";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import { connect } from "react-redux";
import authActions from "../../redux/auth/actions";
import { Mutation } from "react-apollo";
import { SIGNUP } from "../../api/authentication";
import { ADDFARM } from "../../api/farms";
const { Content } = Layout;
const { TextArea } = Input;

class AddFarm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToHome: false,
      showError: false,
      errorMessage: "Some Error",
      name: "",
      location: "",
      zipcode: null,
      description: ""
    };
  }
  handleCreate = () => {
    if (this.state.showError) {
      this.setState({ showError: false });
    }
    this.setState({ redirectToReferrer: true });
  };

  handleError = message => {
    if (!this.state.showError) {
      this.setState({ showError: true });
    }
    this.setState({ errorMessage: message });
  };
  render() {
    // const { isLoggedIn, login } = this.props;
    const {
      showError,
      errorMessage,
      name,
      location,
      zipcode,
      description,
      redirectToHome
    } = this.state;
    if (redirectToHome) {
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
            ADD A FARM
          </h1>
          <Input
            placeholder="Name"
            onChange={e => this.setState({ name: e.target.value })}
            style={{ margin: "24px 0px 0px 0px" }}
          />
          <Input
            placeholder="Loaction"
            onChange={e => this.setState({ location: e.target.value })}
            style={{ margin: "24px 0px 0px 0px" }}
          />
          <Input
            type="number"
            placeholder="Zipcode"
            onChange={e => this.setState({ zipcode: e.target.value })}
            style={{ margin: "24px 0px 0px 0px" }}
          />
          <TextArea
            placeholder="Description"
            onChange={e => this.setState({ description: e.target.value })}
            style={{ margin: "24px 0px 0px 0px" }}
          />
          <Mutation
            mutation={ADDFARM}
            variables={{ name, location, zipcode, description }}
            onCompleted={data => {
              this.handleCreate(data.signin);
            }}
            onError={error => {
              this.handleError(error.message.substr(15));
            }}
          >
            {(createFarm, { loading }) =>
              loading ? (
                <Button
                  type="primary"
                  className="login-form-button"
                  style={{ margin: "10px 0px 5px 0px" }}
                  loading={true}
                >
                  Add System
                </Button>
              ) : (
                <Button
                  type="primary"
                  className="login-form-button"
                  style={{ margin: "10px 0px 5px 0px" }}
                  onClick={createFarm}
                >
                  Add System
                </Button>
              )
            }
          </Mutation>
          {!showError ? null : (
            <p style={{ marginBottom: "20px" }}>{errorMessage}</p>
          )}
          <a onClick={() => this.setState({ redirectToHome: true })}>cancel.</a>
        </Content>
        <Footer />
      </Layout>
    );
  }
}

export default connect(state => ({
  isLoggedIn: state.Auth.idToken !== null
}))(AddFarm);
