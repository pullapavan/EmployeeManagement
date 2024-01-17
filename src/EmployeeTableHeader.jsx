import React from "react";

export default function EmployeeTableHeader(props) {
  return (
    <tr>
      <th>FirstName</th>
      <th>LastName</th>
      <th>Age</th>
      <th>DateOfJoining</th>
      <th>Title</th>
      <th>Department</th>
      <th>EmployeeType</th>
      <th>CurrentStatus</th>
      {!props.hideActions && <th>Actions</th>}
    </tr>
  );
}
