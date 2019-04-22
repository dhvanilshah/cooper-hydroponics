import React, { Component } from "react";
import { Button, Icon, Select } from "antd";
import { Query } from "react-apollo";
import { connect } from "react-redux";
import { GETFARMS } from "../../api/farms";
import farmActions from "../../redux/farm/actions";
import { Redirect } from "react-router-dom";

const { updateFarm } = farmActions;

const Option = Select.Option;

class System extends Component {
  constructor(props) {
    super(props);
    this.state = {
      farms: [],
      disabled: false,
      redirectFarm: false,
      redirectSystem: false
    };
  }

  handleFarmClick = () => {
    this.setState({ redirectFarm: true });
  };

  handleSystemClick = () => {
    this.setState({ redirectSystem: true });
  };

  handleError(error) {
    if ((error = "invalid token")) {
      //   call logout here
      return;
    } else {
      this.setState({ disabled: true });
    }
  }

  handleQuery(data) {
    if (data == null) this.setState({ disabled: true });
    else this.setState({ disabled: false });
    this.setState({ farms: data });
  }

  render() {
    const { farms, disabled, redirectFarm, redirectSystem } = this.state;
    const { updateFarm, currentFarm, activeFarm } = this.props;

    if (redirectFarm) {
      return <Redirect push to="/addfarm" />;
    }
    if (redirectSystem) {
      return <Redirect push to="/addsystem" />;
    }
    return (
      <div
        style={{
          paddingLeft: 24,
          paddingRight: 24,
          width: "100%"
        }}
      >
        <div
          style={{
            float: "left"
          }}
        >
          <Query
            query={GETFARMS}
            onCompleted={data => {
              this.handleQuery(data.getFarms);
            }}
            onError={error => {
              this.handleError(error.message.substr(15));
            }}
          >
            {({ loading }) => {
              return (
                <Select
                  defaultValue={currentFarm}
                  style={{
                    width: 120,
                    marginRight: 20
                  }}
                  onChange={(value, key) => updateFarm(value, key.props.name)}
                  loading={loading}
                  disabled={disabled}
                >
                  {farms.map(farm => {
                    return (
                      <Option
                        value={farm._id.toString()}
                        key={farm.name}
                        name={farm.name}
                      >
                        {farm.name}
                      </Option>
                    );
                  })}
                </Select>
              );
            }}
          </Query>

          <Button type="primary" onClick={this.handleFarmClick}>
            <Icon type="plus" />
            Farm
          </Button>
        </div>
        <div
          style={{
            float: "right"
          }}
        >
          <Button
            type="primary"
            onClick={this.handleSystemClick}
            disabled={activeFarm ? false : true}
          >
            <Icon type="plus" />
            System
          </Button>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    currentFarm: state.Farm.currentFarmName,
    activeFarm: state.Farm.currentFarmId
  }),
  { updateFarm }
)(System);
