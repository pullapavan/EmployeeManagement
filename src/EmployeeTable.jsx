import React from "react";
import { Table } from "react-bootstrap";
import EmployeeTableHeader from "./EmployeeTableHeader";
import EmployeeTableRow from "./EmployeeTableRow";

class EmployeeTable extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <Table striped bordered hover responsive>
          <thead>
            <EmployeeTableHeader hideActions={this.props.hideActions} />
          </thead>
          <tbody>
            {this.props.employees.map((employee) => (
              <EmployeeTableRow
                key={employee._id}
                employee={employee}
                onDeleteClick={this.props.onDeleteClick}
                hideActions={this.props.hideActions}
              />
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default EmployeeTable;
