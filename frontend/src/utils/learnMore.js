import React from "react";

import { Modal, Button } from "antd";

export default class LearnMore extends React.Component {
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  render() {
    return (
      <div>
        <div onClick={this.showModal}>Learn More</div>
        <Modal
          title="About the Project"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>
            We are working on designing and implementing a hydroponics system
            capable of growing Salicornia Bigellovi and converting the grown
            biomass into biojet fuel. Students in the Electrical, Chemical, and
            General Engineering disciplines are collaborating with Professor
            Davis and Professor Shlayan to build out a hydroponics system to
            optimize the growth of Salicornia. In our current stage, we are
            developing an automated hydroponics system capable of (1)
            controlling the plant’s light, nutrient, and environmental
            conditions (2) aggregating sensory and harvest data during the
            plant’s growth cycle. This system will be able to be interfaced with
            a dedicated website to allow for remote monitoring. The goal of this
            current stage is to be able to use the aggregated data to create a
            "growth recipe” which can be input to the automated hydroponics
            system to allow for the Salicornia to grow quickly and efficiently.
            We are using Salicornia because it is an inedible halophyte, meaning
            that it does not require freshwater to grow and therefore will not
            disrupt the food ecosystem.
          </p>
        </Modal>
      </div>
    );
  }
}
