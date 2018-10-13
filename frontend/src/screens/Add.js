import React, { Component } from "react";
import { Table, Input, Layout, Modal, Button, TimePicker } from "antd";
import moment from "moment";
import "../App.css";
import { lightColums, lightData } from "../test/lightshced";

const { Header, Content, Footer } = Layout;

class Add extends Component {
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
      <div
        style={{
          //background: "#ECECEC",
          padding: 24,
          minHeight: 280,
          width: "50%"
        }}
      >
        <Input placeholder="System Name" style={{ marginBottom: 10 }} />
        <Button type="primary" onClick={this.showModal}>
          Add Pump Schedule
        </Button>
        <Modal
          visible={visible}
          title="Input Pump Schedule"
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
              Add
            </Button>
          ]}
        >
          <p>Start Time</p>
          <TimePicker
            //onChange={onChangeT1}
            defaultOpenValue={moment("00:00:00", "HH:mm:ss")}
          />
          <p>End Time</p>
          <TimePicker
            //onChange={onChangeT2}
            defaultOpenValue={moment("00:00:00", "HH:mm:ss")}
          />
        </Modal>
      </div>
    );
  }
}

export default Add;
