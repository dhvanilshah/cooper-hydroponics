import React, { Component } from "react";
import { Table, Card, Layout, Menu } from "antd";
import "./App.css";
import { lightColums, lightData } from "./test/lightshced";
import System from "./screens/System";
import Add from "./screens/Add";
import LoginButton from "./utils/login";
import LearnMore from "./utils/learnMore";

const { Header, Content, Footer } = Layout;

class App extends Component {
  render() {
    return (
      <Layout className="layout">
        <Header className="header">
          <div className="logo">COOPER HYDROPONICS</div>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            style={{ lineHeight: "64px", float: "right" }}
          >
            <Menu.Item key="1">
              <LoginButton />
            </Menu.Item>
            <Menu.Item key="2">
              <LearnMore />
            </Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: "0 0px", marginTop: 64 }}>
          <System />
        </Content>
        <Footer style={{ textAlign: "center" }}>
          COOPER UNION HYDROPONICS © 2019 Created by Dhvanil Shah
        </Footer>
      </Layout>
    );
  }
}

export default App;
