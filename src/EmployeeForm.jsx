import React from "react";
import { getEmployeeByIdAPI } from "./apiUtils";
import { Form, Col, Button, Row } from "react-bootstrap";

class EmployeeForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      firstName: "",
      lastName: "",
      age: "",
      dateOfJoining: "",
      title: "",
      department: "",
      employeeType: "",
      errors: {},
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = {};
    if (!this.state.firstName) {
      errors.firstName = "First Name is required";
    }
    if (!this.state.lastName) {
      errors.lastName = "Last Name is required";
    }
    if (!this.state.age) {
      errors.age = "Age is required";
    } else if (
      isNaN(this.state.age) ||
      this.state.age < 20 ||
      this.state.age > 70
    ) {
      errors.age = "Age must be between 20 and 70";
    }
    if (!this.state.dateOfJoining) {
      errors.dateOfJoining = "Date of Joining is required";
    }
    if (!this.state.title) {
      errors.title = "Title is required";
    }
    if (!this.state.department) {
      errors.department = "Department is required";
    }
    if (!this.state.employeeType) {
      errors.employeeType = "Employee Type is required";
    }

    if (Object.keys(errors).length === 0) {
      console.log("Form data:", this.state);
      this.setState({ errors });
      this.props.onSubmit({
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        age: this.state.age,
        dateOfJoining: this.state.dateOfJoining,
        title: this.state.title,
        department: this.state.department,
        employeeType: this.state.employeeType,
      });
    } else {
      this.setState({ errors });
    }
  };

  componentDidMount() {
    /**
     * First get the employee details based on ID, and send to Form to prefill them...
     */
    if (this.props.employeeId) {
      getEmployeeByIdAPI(this.props.employeeId).then((response) => {
        if (response && response.data) {
          console.log(response.data.getEmployeeById);
          const employee = response.data.getEmployeeById;
          this.setState({
            firstName: employee.firstName || "",
            lastName: employee.lastName || "",
            age: employee.age || "",
            dateOfJoining: employee.dateOfJoining || "",
            title: employee.title || "",
            department: employee.department || "",
            employeeType: employee.employeeType || "",
            errors: {},
          });
        }
      });
    }
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="employee-form">
        <Form onSubmit={this.handleSubmit} noValidate>
          <Form.Group as={Row} controlId="firstName">
            <Form.Label column md="2">
              First Name
            </Form.Label>
            <Col md="8">
              <Form.Control
                type="text"
                name="firstName"
                value={this.state.firstName}
                onChange={this.handleInputChange}
                isInvalid={!!errors.firstName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.firstName}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="lastName">
            <Form.Label column md="2">
              Last Name
            </Form.Label>
            <Col md="8">
              <Form.Control
                type="text"
                name="lastName"
                value={this.state.lastName}
                onChange={this.handleInputChange}
                isInvalid={!!errors.lastName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.lastName}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="age">
            <Form.Label column md="2">
              Age
            </Form.Label>
            <Col md="8">
              <Form.Control
                type="number"
                name="age"
                value={this.state.age}
                onChange={this.handleInputChange}
                isInvalid={!!errors.age}
              />
              <Form.Control.Feedback type="invalid">
                {errors.age}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="dateOfJoining">
            <Form.Label column md="2">
              Date of Joining
            </Form.Label>
            <Col md="8">
              <Form.Control
                type="date"
                name="dateOfJoining"
                value={this.state.dateOfJoining}
                onChange={this.handleInputChange}
                isInvalid={!!errors.dateOfJoining}
              />
              <Form.Control.Feedback type="invalid">
                {errors.dateOfJoining}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="title">
            <Form.Label column md="2">
              Title
            </Form.Label>
            <Col md="8">
              <Form.Control
                as="select"
                name="title"
                value={this.state.title}
                onChange={this.handleInputChange}
                isInvalid={!!errors.title}
              >
                <option value="">Select Title</option>
                <option value="Employee">Employee</option>
                <option value="Manager">Manager</option>
                <option value="Director">Director</option>
                <option value="VP">VP</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.title}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="department">
            <Form.Label column md="2">
              Department
            </Form.Label>
            <Col md="8">
              <Form.Control
                as="select"
                name="department"
                value={this.state.department}
                onChange={this.handleInputChange}
                isInvalid={!!errors.department}
              >
                <option value="">Select Department</option>
                <option value="IT">IT</option>
                <option value="Marketing">Marketing</option>
                <option value="HR">HR</option>
                <option value="Engineering">Engineering</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.department}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="employeeType">
            <Form.Label column md="2">
              Employee Type
            </Form.Label>
            <Col md="8">
              <Form.Control
                as="select"
                name="employeeType"
                value={this.state.employeeType}
                onChange={this.handleInputChange}
                isInvalid={!!errors.employeeType}
              >
                <option value="">Select Employee Type</option>
                <option value="FullTime">FullTime</option>
                <option value="PartTime">PartTime</option>
                <option value="Contract">Contract</option>
                <option value="Seasonal">Seasonal</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.employeeType}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          <div className="text-center">
            <Button type="submit" variant="primary" className="m-auto">
              {this.props.mode === "create"
                ? "Create Employee"
                : "Edit Employee"}
            </Button>
          </div>
        </Form>
      </div>
    );
  }
}

export default EmployeeForm;
