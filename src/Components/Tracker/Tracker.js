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
      updateAction: "1",
      updateAssignedTo: "Rater",
    };
  }

  componentDidMount = async () => {
    const response = await fetch(`http://localhost:4000/tracker`);
    const json = await response.json();
    this.setState(() => {
      return {
        data: json,
      };
    });
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

    this.setState(() => {
      return [
        {
          data: response,
        },
      ];
    });
    this.componentDidMount();
  };

  handleDelete = async (event) => {
    event.preventDefault();

    const reqOptions = {
      method: "DELETE",
    };

    const response = await fetch(
      `http://localhost:4000/tracker/ratee/${this.state.activeReport.ratee_id}`,
      reqOptions
    );

    this.setState(() => {
      return [
        {
          data: response,
        },
      ];
    });
    this.componentDidMount();
  };

  handleNewTrack = async () => {
    const reqOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        closeout: "2022-12-15",
        sq_suspense: "2022-11-15",
        gp_suspense: "2022-11-22",
        wg_suspense: "2022-11-29",
        member_role: "Rater",
        ratee_id: 1,
        rater_id: 2,
        action_id: 1,
        org_name_id: 2,
        report_id: 4,
      }),
    };

    const response = await fetch(`http://localhost:4000/tracker`, reqOptions);

    this.setState(() => {
      return [
        {
          data: response,
        },
      ];
    });
    this.componentDidMount();
  };

  handleActionRouting = (event) => {
    event.preventDefault();
    this.setState(() => {
      return {
        updateAction: event.target.value,
      };
    });
  };

  handleAssignedRouting = (event) => {
    event.preventDefault();
    this.setState(() => {
      return {
        updateAssignedTo: event.target.value,
      };
    });
  };

  handleSelectReport = (event, id) => {
    event.preventDefault();

    let selectedReportArr = this.state.data.filter(
      (element) => element.tracker_id === id
    );

    let [selectedReportObj] = selectedReportArr;

    this.setState(() => {
      return { activeReport: selectedReportObj };
    });
  };

  render() {
    let showTable =
      this.state.data.length > 0 ? (
        <Table click={this.handleSelectReport} data={this.state.data} />
      ) : null;
    return (
      <div className="Tracker">
        {showTable}

        <Form
          report={this.state.activeReport}
          click={this.handleUpdateRouting}
          actionFunc={this.handleActionRouting}
          action={this.state.updateAction}
          assignedFunc={this.handleAssignedRouting}
          assigned={this.state.updateAssignedTo}
          delete={this.handleDelete}
          addReport={this.handleNewTrack}
        />
      </div>
    );
  }
}

export default Tracker;
