import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Table, TableCell, TableHeader, TableRow } from "./styled/Table";
import ButtonAction from "./styled/ButtonAction";
import { Flex } from "../styled";

const List = () => {
  const records = useSelector(state => state.employees);
  const history = useHistory();

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <TableHeader>First Name</TableHeader>
            <TableHeader>Surname</TableHeader>
            <TableHeader>Email</TableHeader>
            <TableHeader>Birth Date</TableHeader>
            <TableHeader>Status</TableHeader>
            <TableHeader>Job Title</TableHeader>
            <TableHeader>Actions</TableHeader>
          </tr>
        </thead>
        <tbody>
          {records.employees_records ? (
            records.employees_records.map(employee => (
              <TableRow key={employee.id}>
                <TableCell>{employee.firstName}</TableCell>
                <TableCell>{employee.surname}</TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>{employee.birthDate}</TableCell>
                <TableCell>{employee.status}</TableCell>
                <TableCell>{employee.jobTitle}</TableCell>
                <TableCell>
                  <Flex>
                    <ButtonAction
                      type="button"
                      onClick={() =>
                        history.push(`/Edit?employee=${employee.id}`)
                      }
                    >
                      Edit
                    </ButtonAction>
                    <ButtonAction type="button">Delete</ButtonAction>
                  </Flex>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan="6">No employees found</TableCell>
            </TableRow>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default List;
