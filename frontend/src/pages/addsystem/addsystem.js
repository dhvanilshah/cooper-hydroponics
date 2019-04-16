import { Layout, Select, Icon, Input, Button, Checkbox } from "antd";
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "antd/dist/antd.css";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import { connect } from "react-redux";
import authActions from "../../redux/auth/actions";
import { Mutation } from "react-apollo";
import { SIGNUP } from "../../api/authentication";
import { ADDSYSTEM } from "../../api/farms";
const { Content } = Layout;
const { TextArea } = Input;
const Option = Select.Option;

class AddSystem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      produce: "",
      name: "",
      showError: false,
      errorMessage: "",
      redirectToReferrer: false
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
      produce,
      name,
      redirectToReferrer
    } = this.state;
    const { currentFarm } = this.props;
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
            ADD A SYSTEM
          </h1>
          <Input
            placeholder="Name"
            onChange={e => this.setState({ name: e.target.value })}
            style={{ margin: "24px 0px 0px 0px" }}
          />
          <Select
            mode="multiple"
            style={{ width: "100%", margin: "24px 0px 0px 0px" }}
            placeholder="Please select produce"
            // defaultValue={}
            onChange={value => this.setState({ produce: value })}
          >
            <Option key={"lettuce"}>Lettuce</Option>
            <Option key={"thai-basil"}>Thai Basil</Option>
            <Option key={"salicornia-b"}>Salicornia Bigelovii</Option>
            <Option key={"salicornia-eu"}>Salicornia Europea</Option>
          </Select>

          <Mutation
            mutation={ADDSYSTEM}
            variables={{ name, produce, farm: currentFarm }}
            onCompleted={data => {
              this.handleCreate(data.signin);
            }}
            onError={error => {
              this.handleError(error.message.substr(15));
            }}
          >
            {(createSystem, { loading }) =>
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
                  onClick={createSystem}
                >
                  Add System
                </Button>
              )
            }
          </Mutation>

          {!showError ? null : (
            <p style={{ marginBottom: "20px" }}>{errorMessage}</p>
          )}
          <a href="/">cancel</a>
        </Content>
        <Footer />
      </Layout>
    );
  }
}

export default connect(state => ({
  isLoggedIn: state.Auth.idToken !== null,
  currentFarm: state.Farm.currentFarmId
}))(AddSystem);
