import React, { Component } from "react";
import { Table, Button, Card } from "antd";
import "../App.css";
import { lightColums, lightData } from "../test/lightshced";

class System extends Component {
  render() {
    return (
      <div
        style={{
          background: "#ECECEC",
          padding: 24,
          minHeight: 280,
          width: "100%",

          display: "flex",
          flexDirection: "row",
          overflow: "scroll"
        }}
      >
        <div>
          <Card
            title="Kevin's Basil Garden"
            bordered={false}
            style={{ width: 350, marginRight: 24 }}
            extra={<Button shape="circle" icon="setting" />}
          >
            <p>Water Temprature: 40 F</p>
            <p>Total Dissolved Solids: 100 PPM</p>
            <p>Pump Status: ON</p>
            <p>Light Status: ON</p>
            <Table
              columns={lightColums}
              dataSource={lightData}
              pagination={false}
              title={() => "Light Schedule"}
            />
            <Table
              columns={lightColums}
              dataSource={lightData}
              pagination={false}
              title={() => "Pump Schedule"}
            />
          </Card>
        </div>

        <div>
          <Card
            title="Sage's Nutrient Experiment"
            bordered={false}
            style={{ width: 350, marginRight: 24 }}
            extra={<Button shape="circle" icon="setting" />}
          >
            <p>Water Temprature: 40 F</p>
            <p>Total Dissolved Solids: 100 PPM</p>
            <p>Pump Status: ON</p>
            <p>Light Status: ON</p>
            <Table
              columns={lightColums}
              dataSource={lightData}
              pagination={false}
              title={() => "Light Schedule"}
            />
            <Table
              columns={lightColums}
              dataSource={lightData}
              pagination={false}
              title={() => "Pump Schedule"}
            />
          </Card>
        </div>

        <div>
          <Card
            title="Basil Row #3"
            bordered={false}
            style={{ width: 350, marginRight: 24 }}
            extra={<Button shape="circle" icon="setting" />}
          >
            <p>Water Temprature: 40 F</p>
            <p>Total Dissolved Solids: 100 PPM</p>
            <p>Pump Status: ON</p>
            <p>Light Status: ON</p>
            <Table
              columns={lightColums}
              dataSource={lightData}
              pagination={false}
              title={() => "Light Schedule"}
            />
            <Table
              columns={lightColums}
              dataSource={lightData}
              pagination={false}
              title={() => "Pump Schedule"}
            />
          </Card>
        </div>

        <div>
          <Card
            title="Nithi's Light Test"
            bordered={false}
            style={{ width: 350, marginRight: 24 }}
            extra={<Button shape="circle" icon="setting" />}
          >
            <p>Water Temprature: 40 F</p>
            <p>Total Dissolved Solids: 100 PPM</p>
            <p>Pump Status: ON</p>
            <p>Light Status: ON</p>
            <Table
              columns={lightColums}
              dataSource={lightData}
              pagination={false}
              title={() => "Light Schedule"}
            />
            <Table
              columns={lightColums}
              dataSource={lightData}
              pagination={false}
              title={() => "Pump Schedule"}
            />
          </Card>
        </div>
      </div>
    );
  }
}

export default System;
