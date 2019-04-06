import React, { Component } from "react";
import { Button, Icon, Select } from "antd";
import { Query } from "react-apollo";
import { connect } from "react-redux";
import { GETFARMS } from "../../api/farms";
import farmActions from "../../redux/farm/actions";

const { updateFarm } = farmActions;

const Option = Select.Option;

class System extends Component {
  constructor(props) {
    super(props);
    this.state = {
      farms: [],
      disabled: true
    };
  }

  handleError(error) {
    if ((error = "invalid token")) {
      //   call logout here
      return;
    }
  }

  handleQuery(data) {
    if (data == null) this.setState({ disabled: true });
    else this.setState({ disabled: false });
    this.setState({ farms: data });
  }

  render() {
    const { farms, disabled } = this.state;
    const { updateFarm, currentFarm } = this.props;
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
                  onChange={value => updateFarm(value)}
                  loading={loading}
                  disabled={disabled}
                >
                  {farms.map(farm => {
                    return (
                      <Option value={farm._id.toString()} key={farm._id}>
                        {farm.name}
                      </Option>
                    );
                  })}
                </Select>
              );
            }}
          </Query>
          <Button type="primary">
            <Icon type="plus" />
            Farm
          </Button>
        </div>
        <div
          style={{
            float: "right"
          }}
        >
          <Button type="primary">
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
    currentFarm: state.Farm.currentFarm
  }),
  { updateFarm }
)(System);
