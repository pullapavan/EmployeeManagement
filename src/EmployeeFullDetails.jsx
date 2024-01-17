import React from "react";
import { getEmployeeByIdAPI } from "./apiUtils";
import { withRouter } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

class EmployeeFullDetails extends React.Component {
  constructor() {
    super();
    this.state = { employee: {} };
  }

  loadData = () => {
    getEmployeeByIdAPI(this.props.match.params.id).then((response) => {
      if (response && response.data) {
        const employee = response.data.getEmployeeById;
        this.setState({ employee: employee });
      }
    });
  };

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    const {
      match: {
        params: { id: prevId },
      },
    } = prevProps;
    const {
      match: {
        params: { id },
      },
    } = this.props;
    if (prevId !== id) {
      this.loadData();
    }
  }

  render() {
    const { employee } = this.state;
    return (
      <Container
        className="shadow-lg"
        style={{ maxWidth: "60%" }}
      >
        <h4 className="mb-4">Employee Details</h4>
        <Row>
          <Col md={6} className="mb-3">
            <div>First Name: {employee.firstName}</div>
          </Col>
          <Col md={6} className="mb-3">
            <div>Last Name: {employee.lastName}</div>
          </Col>
          <Col md={6} className="mb-3">
            <div>Age: {employee.age}</div>
          </Col>
          <Col md={6} className="mb-3">
            <div>Date of Joining: {employee.dateOfJoining}</div>
          </Col>
          <Col md={6} className="mb-3">
            <div>Title: {employee.title}</div>
          </Col>
          <Col md={6} className="mb-3">
            <div>Department: {employee.department}</div>
          </Col>
          <Col md={6} className="mb-3">
            <div>Employee Type: {employee.employeeType}</div>
          </Col>
          <Col md={6} className="mb-3">
            <div>Status: {employee.currentStatus}</div>
          </Col>
          <Col md={12} className="mb-3">
            <div>Retirement in : {employee.expiryString}</div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withRouter(EmployeeFullDetails);
