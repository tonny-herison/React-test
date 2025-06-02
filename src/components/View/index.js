import React from "react";
import { useHistory } from "react-router";
import { Box, Button, Flex, Header } from "../styled";
import DataTable from "./Datatable";

const View = () => {
  const history = useHistory();

  return (
    <>
      <Header data-cy="header">View Employees</Header>
      <DataTable />
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        marginTop="lg"
      >
        <Box>
          <Button data-cy="backButton" onClick={() => history.goBack()}>
            Back
          </Button>
        </Box>
      </Flex>
    </>
  );
};

export default View;
