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
            This project is a collaboration between students within the
            Electrical, Chemical, and General Engineering disciplines in efforts
            to design and implement a hydroponics system capable of growing
            Salicornia Bigellovi and converting the grown biomass into biojet
            fuel. In our current stage, we are developing an automated
            hydroponics system capable of (1) controlling the plant’s light,
            nutrient, and environmental conditions (2) aggregating sensory and
            harvest data during the plant’s growth cycle. This system will be
            capable of being interfaced and monitored remotely via a dedicated
            website. The goal of this stage is to be able to use the aggregated
            data to create a "growth recipe” which can be inputted to the
            automated hydroponics system to grow Salicornia quickly and
            efficiently. Salicornia is chosen because it is an inedible
            halophyte, meaning that it does not require freshwater to grow and
            therefore will not disrupt the food ecosystem.
          </p>
        </Modal>
      </div>
    );
  }
}
