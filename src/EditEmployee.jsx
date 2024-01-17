import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {
  updateEmployeeAPI,
} from "./apiUtils";
import EmployeeForm from "./EmployeeForm";

class EditEmployee extends Component {
  constructor() {
    super();
    this.state = {
      employee: {},
    };
  }
  /**
   * This sends a request to API to create an edit employee...
   * @param {*} employee
   */
  updateExistingEmployee = async (employee) => {
    const result = await updateEmployeeAPI(this.props.match.params.id, employee);
    if (result && result.data) {
      this.props.history.push("/employees");
    } else {
      alert("Error in editing Employee Details...");
    }
  };

  render() {

    return (
      <div>
        <h3 className="text-center">Update Employee Details</h3>
        {/* Pass employeeId to EmployeeForm */}
        <EmployeeForm
          mode="edit"
          employeeId={this.props.match.params.id}
          onSubmit={this.updateExistingEmployee}
        />
      </div>
    );
  }
}

export default withRouter(EditEmployee);
