import { Layout } from "antd";
import React, { Component } from "react";

const { Footer } = Layout;
class FooterBar extends Component {
  render() {
    return (
      <Footer style={{ textAlign: "center" }}>
        Hydroponics ©2019 Created by Dhvanil Shah
      </Footer>
    );
  }
}

export default FooterBar;
