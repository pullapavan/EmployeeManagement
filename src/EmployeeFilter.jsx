import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Form, Col } from "react-bootstrap";

class EmployeeFilter extends Component {
  constructor(props) {
    super(props);

    const queryParams = new URLSearchParams(props.location.search);
    this.state = {
      selectedValue: queryParams.get("employeeType") || "",
    };

    this.handleEmployeeTypeChange = this.handleEmployeeTypeChange.bind(this);
  }

  handleEmployeeTypeChange(event) {
    const { value } = event.target;

    this.setState({ selectedValue: value });

    const { history, location } = this.props;
    const newQueryParams = new URLSearchParams(location.search);
    newQueryParams.set("employeeType", value);

    if (value) {
      history.push(`/employees?${newQueryParams.toString()}`);
    } else {
      history.push(`/employees`);
    }
  }

  render() {
    const { selectedValue } = this.state;

    return (
      <Form.Group as={Col} md="6" controlId="employeeType">
        <Form.Label>
          <h6 className="mb-2">Filter by Type:</h6>
        </Form.Label>
        <Form.Control
          as="select"
          value={selectedValue}
          onChange={this.handleEmployeeTypeChange}
        >
          <option value="">All Employees</option>
          <option value="FullTime">FullTime</option>
          <option value="PartTime">PartTime</option>
          <option value="Contract">Contract</option>
          <option value="Seasonal">Seasonal</option>
          <option value="retirement">Upcoming Retirement</option>
        </Form.Control>
      </Form.Group>
    );
  }
}

export default withRouter(EmployeeFilter);
