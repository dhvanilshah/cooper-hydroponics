import React, { Component } from "react";
import { Table, Card, Layout, Button } from "antd";
import "./App.css";
import { lightColums, lightData } from "./test/lightshced";
import System from "./screens/System";
import Add from "./screens/Add";

const { Header, Content, Footer } = Layout;

class App extends Component {
  render() {
    return (
      <Layout className="layout">
        <Header>
          <div className="logo" />
        </Header>
        <Content style={{ padding: "10px 50px" }}>
          <System />
        </Content>
        <Footer style={{ textAlign: "center" }}>
          PRODUCE. ©2018 Created by Dhvanil Shah
        </Footer>
      </Layout>
    );
  }
}

export default App;
