import React from "react";

import { Modal, Input, Button } from "antd";

export default class LoginModal extends React.Component {
  state = {
    loading: false,
    visible: false
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  render() {
    const { visible, loading } = this.state;
    return (
      <div>
        <div onClick={this.showModal}>Login</div>
        <Modal
          visible={visible}
          title="Login"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              cancel
            </Button>,
            <Button
              key="submit"
              type="primary"
              loading={loading}
              onClick={this.handleOk}
            >
              Login
            </Button>
          ]}
        >
          <Input placeholder="Username" />
          <Input
            type="password"
            placeholder="Password"
            style={{ marginTop: 20 }}
          />
        </Modal>
      </div>
    );
  }
}
