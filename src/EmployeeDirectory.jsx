import React from "react";
import { deleteEmployeeByIdAPI, getAllEmployeesAPI } from "./apiUtils";
import EmployeeTable from "./EmployeeTable";
import EmployeeFilter from "./EmployeeFilter";
import { Route } from "react-router-dom";
import EmployeeFullDetails from "./EmployeeFullDetails";
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

class EmployeeDirectory extends React.Component {
  constructor() {
    super();
    this.state = { employees: [], error: false, errorMessage: "" };
    this.getAllEmployees = this.getAllEmployees.bind(this);
  }

  componentDidMount() {
    this.getAllEmployees();
  }

  async getAllEmployees() {
    const {
      location: { search },
    } = this.props;
    const params = new URLSearchParams(search);

    const result = await getAllEmployeesAPI(params.get("employeeType"));
    if (result && result.data) {
      this.setState({ employees: result.data.getAllEmployees });
    } else {
      this.setState({ employees: [] });
      alert("Error in getting Employee Details");
    }
  }

  onDeleteClick = async (id) => {
    const response = await deleteEmployeeByIdAPI(id);
    if (
      response &&
      response.data &&
      response.data.deleteEmployeeById &&
      !response.data.deleteEmployeeById.error
    ) {
      this.getAllEmployees();
      this.props.history.push("/");
    } else {
      this.setState({
        ...this.state,
        error: true,
        errorMessage: response.data.deleteEmployeeById.error,
      });
    }
  };

  componentDidUpdate(prevProps) {
    const {
      location: { search: prevSearch },
    } = prevProps;
    const {
      location: { search },
    } = this.props;
    if (prevSearch !== search) {
      this.getAllEmployees();
    }
  }

  render() {
    return (
      <>
        <Container className="mt-4">
          <h3 className="mb-4 text-center">Employee List</h3>
          <Row>
            <Col md={12}>
              <EmployeeFilter /><br/>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <EmployeeTable
                employees={this.state.employees}
                onDeleteClick={this.onDeleteClick}
              />
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Route
                path={`${this.props.match.path}/:id`}
                component={EmployeeFullDetails}
              />
            </Col>
          </Row>
        </Container>
        <Modal
          show={this.state.error}
          onHide={() => {
            this.setState({
              ...this.state,
              error: false,
              errorMessage: "",
            });
          }}
        >
          <Modal.Body>{this.state.errorMessage}</Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                this.setState({
                  ...this.state,
                  error: false,
                  errorMessage: "",
                });
              }}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default EmployeeDirectory;
