import React, { Component } from "react";
import { connect } from "react-redux";

class Msg extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMsg: false,
      openingHoursMsg: null
    };
  }
  componentDidUpdate(prevProps) {
    if (this.props.openingHoursMsg.time !== prevProps.openingHoursMsg.time) {
      this.setState({
        showMsg: true,
        openingHoursMsg: this.props.openingHoursMsg.openingHoursMsg
      }),
        setTimeout(
          function() {
            this.setState({
              showMsg: false
            });
          }.bind(this),
          3000
        );
    }
  }
  render() {
    const openingHoursMsg = this.state.openingHoursMsg;
    return (
      <React.Fragment>
        {this.state.showMsg && (
          <div className="dashboard-msg">
            {openingHoursMsg ? <p>{openingHoursMsg}</p> : null}
          </div>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    openingHoursMsg: state.workday
  };
};

export default connect(mapStateToProps)(Msg);
