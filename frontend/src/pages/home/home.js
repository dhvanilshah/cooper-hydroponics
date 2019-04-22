import { Layout } from "antd";
import React, { Component } from "react";
import "antd/dist/antd.css";
import { connect } from "react-redux";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import System from "../../components/system/system";
import Selector from "../../components/selector/selector";

const { Content } = Layout;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { redirectToReferrer: false };
  }

  render() {
    return (
      <Layout className="layout">
        <Header />
        <Content
          style={{
            padding: "0 0px",
            marginTop: 24,
            height: window.innerHeight * 0.9
          }}
        >
          <Selector />
          <System />
        </Content>
        <Footer />
      </Layout>
    );
  }
}

export default connect(state => ({
  isLoggedIn: state.Auth.idToken !== null
}))(Home);
