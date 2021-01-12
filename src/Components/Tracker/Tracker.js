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
    };
  }

  componentDidMount = async () => {
    const response = await fetch(`/rater/2`);
    const json = await response.json();
    this.setState({ data: json });
  };

  handleNewTrack = async () => {
    const reqOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        closeout: "2021-11-30",
        sq_suspense: "2021-11-10",
        gp_suspense: "2021-11-17",
        wg_suspense: "2021-11-24",
        member_role: "rater",
        ratee_id: 4,
        rater_id: 2,
        action_id: 1,
        org_name_id: 2,
      }),
    };

    const response = await fetch(`/tracker`, reqOptions);

    this.setState({ data: response });
  };

  handleUpdateAction = (event, id) => {
    event.preventDefault();

    let thisOne = this.state.data.filter(
      (element) => element.tracker_id === id
    );

    let [one] = thisOne;

    this.setState({ activeReport: one });
  };

  render() {
    return (
      <div className="App">
        <Table click={this.handleUpdateAction} data={this.state.data} />

        <Form report={this.state.activeReport} click={this.handleNewTrack} />
      </div>
    );
  }
}

export default Tracker;
