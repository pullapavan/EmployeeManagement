import React from "react";
import { NavLink } from "react-router-dom";
import { Button, ButtonGroup } from "react-bootstrap";

export default function EmployeeTableRow({
  employee,
  onDeleteClick,
  hideActions,
}) {
  return (
    <tr>
      <td>{employee.firstName}</td>
      <td>{employee.lastName}</td>
      <td>{employee.age}</td>
      <td>{employee.dateOfJoining}</td>
      <td>{employee.title}</td>
      <td>{employee.department}</td>
      <td>{employee.employeeType}</td>
      <td>{employee.currentStatus == "1" ? "Active" : "InActive"}</td>
      {!hideActions && (
        <td>
          <ButtonGroup>
            <NavLink
              exact
              to={`/employees/${employee._id}`}
              className="btn btn-info btn-sm"
            >
              Details
            </NavLink>
            <NavLink
              to={`/employee/edit/${employee._id}`}
              className="btn btn-warning btn-sm"
            >
              Edit
            </NavLink>
            <Button
              variant="danger"
              size="sm"
              onClick={() => onDeleteClick(employee._id)}
            >
              Delete
            </Button>
          </ButtonGroup>
        </td>
      )}
    </tr>
  );
}
