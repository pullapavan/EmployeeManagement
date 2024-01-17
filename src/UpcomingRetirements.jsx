import React, { useEffect, useState } from "react";
import { getUpcomingRetirements } from "./apiUtils";
import EmployeeTable from "./EmployeeTable";
import { Container, Row, Col } from "react-bootstrap";

export default function UpcomingRetirements() {
  const [upcomingRetirements, setUpcomingRetirements] = useState([]);

  useEffect(() => {
    console.log('Inside use Effect');
    getUpcomingRetirements()
      .then((response) => {
        if (response && response.data && response.data.getUpcomingRetirements) {
          setUpcomingRetirements(response.data.getUpcomingRetirements);
        }
      })
      .catch(() => {
        setUpcomingRetirements([]);
      });
  }, []);

  return (
    <>
      <Container className="mt-4">
        <h2 className="text-center">Upcoming Retirements</h2>
        <Row>
          <Col md={12}>
            <EmployeeTable employees={upcomingRetirements} hideActions={true} />
          </Col>
        </Row>
      </Container>
    </>
  );
}
