import React from "react";
import { useHistory } from "react-router";
import { createClient } from "@supabase/supabase-js";
import { Table, TableCell, TableHeader, TableRow } from "./styled/Table";
import ButtonAction from "./styled/ButtonAction";
import { Flex } from "../styled";
import { supabaseKey, supabaseUrl } from "../../configs/supabase";

const List = ({ data, reload }) => {
  const supabase = createClient(supabaseUrl, supabaseKey);
  const history = useHistory();

  const handleDelete = async id => {
    const { error } = await supabase.from("employees").delete().eq("id", id);

    if (error) {
      console.error("Error deleting employee:", error);
      return;
    }

    reload();
  };

  return (
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
        {data && data.length ? (
          data.map(employee => (
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
  );
};

export default List;
