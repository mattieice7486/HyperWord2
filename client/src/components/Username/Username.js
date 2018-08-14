import React from "react";
import "./Username.css";

// Using the datalist element we can create autofill suggestions based on the props.breeds array
const Username = props => (
  <form className="userName">
    <div className="form-group">
      <label htmlFor="username">User Name:</label>
      <input
        value={props.Username}
        onChange={props.handleInputChange}
        name="username"
        type="text"
        className="form-control"
        placeholder="User Name"
        id="breed"
      />
      
      <button
        type="submit"
        onClick={props.handleFormSubmit}
        className="btn btn-success"
      >
        Submit
      </button>
    </div>
  </form>
);

export default Username;
