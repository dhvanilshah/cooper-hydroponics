import React, { Component } from "react";
import {
  Drawer,
  Form,
  Button,
  TimePicker,
  Modal,
  Input,
  Select,
  DatePicker,
  Icon
} from "antd";
import moment from "moment";

const { Option } = Select;

export default class DrawerForm extends React.Component {
  state = { visible: false, visibleM: false, loading: false };

  showModal = () => {
    this.setState({
      visibleM: true
    });
  };

  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visibleM: false });
    }, 3000);
  };

  handleCancel = () => {
    this.setState({ visibleM: false });
  };

  showDrawer = () => {
    this.setState({
      visible: true
    });
  };

  onClose = () => {
    this.setState({
      visible: false
    });
  };

  render() {
    const { visibleM, loading } = this.state;
    return (
      <div>
        <Button type="primary" onClick={this.showDrawer}>
          <Icon type="plus" /> New System
        </Button>
        <Drawer
          title="Set Up a New System"
          width={720}
          onClose={this.onClose}
          visible={this.state.visible}
          style={{
            overflow: "auto",
            height: "calc(100% - 108px)",
            paddingBottom: "108px"
          }}
        >
          <Input placeholder="System Name" style={{ marginBottom: 20 }} />
          <Button type="primary" onClick={this.showModal}>
            Add Light Schedule
          </Button>

          <div
            style={{
              position: "absolute",
              left: 0,
              bottom: 0,
              width: "100%",
              borderTop: "1px solid #e9e9e9",
              padding: "10px 16px",
              background: "#fff",
              textAlign: "right"
            }}
          >
            <Button onClick={this.onClose} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button onClick={this.onClose} type="primary">
              Submit
            </Button>
          </div>
        </Drawer>

        {/* MODAL FOR LIGHT SCHEDULE */}
        <Modal
          visible={visibleM}
          title="Input Light Schedule"
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
              ADD
            </Button>
          ]}
        >
          <p>Start Time</p>
          <TimePicker
            //onChange={onChangeT1}
            defaultOpenValue={moment("00:00:00", "HH:mm:ss")}
          />
          <p style={{ paddingTop: 15 }}>End Time</p>
          <TimePicker
            //onChange={onChangeT2}
            defaultOpenValue={moment("00:00:00", "HH:mm:ss")}
          />
        </Modal>
        {/* END OF MODAL FOR LIGHT SCHEDULE */}
      </div>
    );
  }
}
