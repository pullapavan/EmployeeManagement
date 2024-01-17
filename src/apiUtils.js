export const graphQLFetch = async (query, variables = {}) => {
  try {
    const response = await fetch("/graphql", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables }),
    });
    const body = await response.text();
    const result = JSON.parse(body);
    return result;
  } catch (e) {
    console.error(`Error in sending data to server:`, e);
    return null;
  }
};

export const getAllEmployeesAPI = async (employeeType) => {
  const query = `query getAllEmployees($employeeType: String){
          getAllEmployees(employeeType: $employeeType) {
            _id
            firstName
            lastName
            age
            dateOfJoining
            title
            department
            employeeType
            currentStatus
            expiryString
          }
        }`;

  return graphQLFetch(query, { employeeType });
};

export const getUpcomingRetirements = async () => {
  const query = `query getUpcomingRetirements{
    getUpcomingRetirements{
            _id
            firstName
            lastName
            age
            dateOfJoining
            title
            department
            employeeType
            currentStatus
          }
        }`;

  return graphQLFetch(query);
};

export const getEmployeeByIdAPI = async (id = "") => {
  const query = `query getEmployeeById($id: String!) {
      getEmployeeById(id: $id) {
        _id
        firstName
        lastName
        age
        dateOfJoining
        title
        department
        employeeType
        currentStatus
        expiryString
      }
    }`;
  return graphQLFetch(query, { id });
};

export const createEmployeeAPI = async (employee) => {
  const mutation = `mutation {
          addEmployee(employee: {
            firstName: "${employee.firstName}",
            lastName: "${employee.lastName}",
            age: ${employee.age},
            dateOfJoining: "${employee.dateOfJoining}",
            title: "${employee.title}",
            department: "${employee.department}",
            employeeType: "${employee.employeeType}",
            currentStatus: 1
          }) {
            _id
            firstName
            lastName
            age
            dateOfJoining
            title
            department
            employeeType
            currentStatus
          }
        }`;

  return graphQLFetch(mutation);
};

export const updateEmployeeAPI = async (id, employee) => {
  const mutation = `mutation updateEmployee($id: String!, $input: EmployeeInput!) {
        updateEmployee(id: $id, input: $input) {
          _id
          firstName
          lastName
          age
          dateOfJoining
          title
          department
          employeeType
          currentStatus
        }
      }`;
  const variables = { id, input: { ...employee } };
  return graphQLFetch(mutation, variables);
};

export const deleteEmployeeByIdAPI = async (id) => {
  const mutation = `mutation deleteEmployeeById($id: String!) {
        deleteEmployeeById(id: $id) {
          error
          deletedEmployee {
            _id
          }
        }
      }`;
  const variables = { id };
  return graphQLFetch(mutation, variables);
};
