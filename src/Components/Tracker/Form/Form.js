import React from "react";
import "./Form.css";

const form = (props) => {
  const updateReport = (
    <form onSubmit={(event) => props.click(event)}>
      <label className="Options">
        Update Action :
        <select
          className="Options"
          value={props.action}
          onChange={props.actionFunc}
        >
          <option value="1">Draft</option>
          <option value="2">Review</option>
          <option value="3">Edit</option>
          <option value="4">Sign</option>
        </select>
      </label>
      <br></br>
      <br></br>
      <label className="Options">
        Update Assigned :
        <select
          className="Options"
          value={props.assigned}
          onChange={props.assignedFunc}
        >
          <option value="Rater">Rater</option>
          <option value="A-Rater">A-Rater</option>
          <option value="Admin">Admin</option>
          <option value="Sq/CC">Sq/CC</option>
          <option value="Gp/CC">Gp/CC</option>
          <option value="Wg/CC">Wg/CC</option>
        </select>
      </label>
      <br></br>
      <br></br>
      <button className="Button" onClick={props.click}>
        Submit
      </button>
    </form>
  );

  return (
    <div className="Form">
      <div>
        {props.report ? (
          <p>
            <b>Close Out:</b> {props.report.closeout.slice(0, 10)}
          </p>
        ) : (
          <h3> Select Report to Update</h3>
        )}
        {props.report ? (
          <p>
            <b>Ratee:</b> {props.report.ratee_id}
          </p>
        ) : null}
        {props.report ? (
          <p>
            <b>Assigned To:</b> {props.report.member_role}
          </p>
        ) : null}
      </div>

      {props.report ? updateReport : null}
    </div>
  );
};

export default form;
