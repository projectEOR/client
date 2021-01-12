import React from "react";
import "./Form.css";

const form = (props) => {
  return (
    <div className="Form">
      <div>
        {props.report ? (
          <p className="ratee">
            <b>Close Out:</b> {props.report.closeout.slice(0, 10)}
          </p>
        ) : (
          <h3>Select Report to Update</h3>
        )}
        {props.report ? (
          <p className="ratee">
            <b>Ratee:</b> {props.report.ratee_id}
          </p>
        ) : null}
        {props.report ? (
          <p className="ratee">
            <b>Assigned To:</b> {props.report.member_role}
          </p>
        ) : null}
      </div>

      <form onSubmit={(event) => props.click(event)}>
        <input type="text" />
        <button>Update Tracker</button>
      </form>
    </div>
  );
};

export default form;
