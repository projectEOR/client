import React, { Component } from "react";
import Table from "./Table/Table";
import Form from "./Form/Form";
import "./Tracker.css";

class Tracker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [{}],
      activeReport: "",
      updateAction: "",
      updateAssignedTo: "",
    };
  }

  componentDidMount = async () => {
    try {
      const response = await fetch(`http://localhost:4000/tracker`);
      const json = await response.json();
      this.setState({ data: json });
    } catch (e) {
      console.error(e);
    }
  };

  handleUpdateRouting = async (event) => {
    event.preventDefault();

    const reqOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        member_role: this.state.updateAssignedTo,
        action_id: this.state.updateAction,
      }),
    };

    const response = await fetch(
      `http://localhost:4000/tracker/ratee/${this.state.activeReport.ratee_id}`,
      reqOptions
    );

    this.setState({ data: response });
  };

  handleActionRouting = (event) => {
    event.preventDefault();
    this.setState({
      updateAction: event.target.value,
    });
  };

  handleAssignedRouting = (event) => {
    event.preventDefault();
    this.setState({
      updateAssignedTo: event.target.value,
    });
  };

  handleSelectReport = (event, id) => {
    event.preventDefault();

    let thisOne = this.state.data.filter(
      (element) => element.tracker_id === id
    );

    let [one] = thisOne;

    this.setState({ activeReport: one });
  };

  render() {
    return (
      <div className="Tracker">
        <Table click={this.handleSelectReport} data={this.state.data} />

        <Form
          report={this.state.activeReport}
          click={this.handleUpdateRouting}
          actionFunc={this.handleActionRouting}
          action={this.state.updateAction}
          assignedFunc={this.handleAssignedRouting}
          assigned={this.state.updateAssignedTo}
        />
      </div>
    );
  }
}

export default Tracker;
