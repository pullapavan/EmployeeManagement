import React from "react";
import EmployeeDirectory from "./EmployeeDirectory";
import AddEmployee from "./AddEmployee";
import EditEmployee from "./EditEmployee";
import { Redirect, Route, Switch } from "react-router-dom";
import UpcomingRetirements from "./UpcomingRetirements";

const NotFound = () => <h1>Page Not Found</h1>;

export default function ApplicationRoutes() {
  return (
    <Switch>
      <Redirect exact from="/" to="/employees" />
      <Route path="/employees" component={EmployeeDirectory} />
      <Route path="/add" component={AddEmployee} />
      <Route path="/employee/edit/:id" component={EditEmployee} />
      <Route path="/upcomingRetirement" component={UpcomingRetirements} />
      <Route component={NotFound} />
    </Switch>
  );
}
