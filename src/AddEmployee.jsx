import React from "react";
import EmployeeForm from "./EmployeeForm";
import { createEmployeeAPI } from "./apiUtils";
import { withRouter } from "react-router-dom";

function AddEmployee(props) {
  /**
   * This sends a request to API to create a new employee...
   * @param {*} employee
   */
  const createNewEmployee = async (employee) => {
    const result = await createEmployeeAPI(employee);
    if (result && result.data) {
      props.history.push("/employees");
    } else {
      alert("Error in submitting Employee Details...");
    }
  };

  /**
   * This used reusable EmployeeForm component with create mode...
   */
  return (
    <div>
      <h3 className="text-center">Create Employee</h3>
      <EmployeeForm mode="create" onSubmit={createNewEmployee} />
    </div>
  );
}

export default withRouter(AddEmployee)