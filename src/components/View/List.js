import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { Table, TableCell, TableHeader, TableRow } from "./styled/Table";
import ButtonAction from "./styled/ButtonAction";
import { Flex } from "../styled";
import { deleteEmployee } from "../../redux/employees/actionCreators";
import Pagination from "./Pagination";
import UseList from "../../hooks/useList";

const List = () => {
  const { currentPage, currentRecords, totalPages, totalRecords, handlePage } =
    UseList();
  const history = useHistory();
  const dispatch = useDispatch();

  const handleDelete = id => {
    dispatch(deleteEmployee(id));
  };

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
          {currentRecords && currentRecords.length ? (
            currentRecords.map(employee => (
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
                      onClick={() => history.push(`/edit/${employee.id}`)}
                    >
                      Edit
                    </ButtonAction>
                    <ButtonAction
                      type="button"
                      onClick={() => handleDelete(employee.id)}
                    >
                      Delete
                    </ButtonAction>
                  </Flex>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan="7" style={{ textAlign: "center" }}>
                No employees found
              </TableCell>
            </TableRow>
          )}
        </tbody>
      </Table>
      <Pagination
        currentPage={currentPage}
        recordsPerPage={currentRecords.length}
        totalRecords={totalRecords}
        totalPages={totalPages}
        handleCurrentPage={page => handlePage(page)}
      />
    </div>
  );
};

export default List;
