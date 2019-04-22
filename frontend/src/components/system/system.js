import React, { Component } from "react";
import { Table, Button, Card, Icon, Select } from "antd";
import { lightColums } from "./lightTable";
import { data } from "./test_sys_data";
import { Query } from "react-apollo";
import { connect } from "react-redux";
import { GETSYSTEMS } from "../../api/farms";
import farmActions from "../../redux/farm/actions";

const { setMessage } = farmActions;

function handleChange(value) {
  console.log(`selected ${value}`);
}

class System extends Component {
  constructor(props) {
    super(props);
    this.state = {
      systems: []
    };
  }
  handleError(error) {
    this.setState({ systems: [] });
    if ((error = "invalid token")) {
      //   call logout here
      return;
    } else {
      console.log(error);
      this.props.setMessage(error);
    }
  }

  handleQuery(data) {
    console.log(data);
    this.setState({ systems: data });
  }

  render() {
    const { currentFarm } = this.props;
    const { systems } = this.state;
    return (
      <div>
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
          <Query
            query={GETSYSTEMS}
            variables={{ farm: currentFarm }}
            onCompleted={data => {
              this.handleQuery(data.getSystems);
            }}
            onError={error => {
              this.handleError(error.message.substr(15));
            }}
          >
            {({ loading }) => {
              return systems.map(system => {
                return (
                  <div key={system.name}>
                    <Card
                      title={system.name}
                      key={system._id.toString()}
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
                      {system.mounted ? (
                        <div>
                          <p>Water Temprature: {system.waterTemp} F</p>
                          <p>Total Dissolved Solids: {system.tds} PPM</p>
                          <p>Pump Status: {system.pumpStatus ? "ON" : "OFF"}</p>
                          <p>
                            Light Status: {system.lightStatus ? "ON" : "OFF"}
                          </p>
                          <p>Water Level: {system.waterLevel ? "OK" : "LOW"}</p>
                          <p>
                            Last Measurement:{" "}
                            {system.lastReading ? system.lastReading : "none"}
                          </p>
                          <p>
                            Last Harvest:{" "}
                            {system.lastHarvest ? system.lastHarvest : "none"}
                          </p>
                          {/* <Table
                        columns={lightColums}
                        dataSource={system.lightSched}
                        pagination={false}
                        title={() => "Light Schedule"}
                      /> */}
                        </div>
                      ) : (
                        <div>
                          <p>
                            This system has not yet been connected. Please enter
                            the code below in the hardware:
                          </p>
                          <p>{system._id.toString()}</p>
                        </div>
                      )}
                    </Card>
                  </div>
                );
              });
            }}
          </Query>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    currentFarm: state.Farm.currentFarmId
  }),
  { setMessage }
)(System);
