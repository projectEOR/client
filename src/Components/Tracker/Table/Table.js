import React, { Component } from "react";
import "./Table.css";

export default class Table extends Component {
  constructor(props) {
    super(props);
    this.getHeader = this.getHeader.bind(this);
    this.getRowsData = this.getRowsData.bind(this);
    this.getKeys = this.getKeys.bind(this);
  }
  getKeys = () => {
    return Object.keys(this.props.data[0]);
  };

  getHeader = () => {
    let keys = this.getKeys();

    return keys.map((key, index) => {
      if (key === "tracker_id") return null;
      return (
        <th key={index * 100000 + 11}>
          {key
            .toUpperCase()
            .replace("_", " ")
            .replace("ID", "")
            .replace("NAME_", "")
            .replace("MEMBER ROLE", "ASSIGNED")}
        </th>
      );
    });
  };

  getRowsData = () => {
    let items = this.props.data;
    let keys = this.getKeys();

    return items.map((row, index) => {
      return (
        <tr
          onClick={(event) => this.props.click(event, row.tracker_id)}
          key={index}
        >
          <RenderRow key={index} data={row} keys={keys} />
        </tr>
      );
    });
  };

  render() {
    return (
      <div className="Table">
        <img
          src="https://www.trademark.af.mil/portals/73/Images/intro.png?ver=2020-07-16-165950-103"
          alt=""
        />
        <table>
          <thead>
            <tr>{this.getHeader()}</tr>
          </thead>
          <tbody>{this.getRowsData()}</tbody>
        </table>
      </div>
    );
  }
}

const RenderRow = (props) => {
  return props.keys.map((key, index) => {
    if (key === "tracker_id") return null;
    if (
      key === "closeout" ||
      key === "sq_suspense" ||
      key === "gp_suspense" ||
      key === "wg_suspense"
    ) {
      let tempKey = props.data[key].slice();
      let newKey = tempKey.slice(0, 10);
      return <td key={index * 5000 + 13}>{newKey}</td>;
    }
    return <td key={index * 5000 + 13}>{props.data[key]}</td>;
  });
};
