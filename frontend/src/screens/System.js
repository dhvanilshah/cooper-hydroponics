import React, { Component } from "react";
import { Table, Button, Card, Icon } from "antd";
import "../App.css";
import { lightColums, lightData } from "../test/lightshced";
import { data } from "../test/test_sys_data";
import AddSystem from "../utils/addSystem";

class System extends Component {
  render() {
    return (
      <div>
        <div
          style={{
            paddingLeft: 24,
            paddingRight: 24,
            width: "100%"
          }}
        >
          {/* <div
            style={{
              float: "left"
            }}
          >
            HELLO
          </div> */}
          <div
            style={{
              float: "right"
            }}
          >
            {/* <Button type="primary" onClick={this.showDrawer}>
              <Icon type="plus" /> New account
            </Button> */}
            <AddSystem />
          </div>
        </div>
        <div
          style={{
            padding: 24,
            minHeight: 280,
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "row",
            overflowX: "scroll",
            overflowY: "scroll"
          }}
        >
          {data.map(system => {
            return (
              <div key={system.title}>
                <Card
                  title={system.title}
                  bordered={false}
                  style={{ width: 350, marginRight: 24 }}
                  extra={<Button shape="circle" icon="setting" />}
                  actions={[
                    <div>
                      <Icon type="to-top" style={{ paddingRight: 15 }} />
                      Harvest
                    </div>
                  ]}
                >
                  <p>Water Temprature: {system.waterTemp} F</p>
                  <p>Total Dissolved Solids: {system.tds} PPM</p>
                  <p>Pump Status: {system.pumpStat ? "ON" : "OFF"}</p>
                  <p>Light Status: {system.lightStat ? "ON" : "OFF"}</p>
                  <p>Last Harvest: {system.lastHarv}</p>
                  <Table
                    columns={lightColums}
                    dataSource={system.lightSched}
                    pagination={false}
                    title={() => "Light Schedule"}
                  />
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default System;
