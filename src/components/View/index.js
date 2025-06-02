import React from "react";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { createClient } from "@supabase/supabase-js";
import { Box, Button, Flex, Header } from "../styled";
import DataTable from "./Datatable";
import { supabaseKey, supabaseUrl } from "../../configs/supabase";
import { setEmployees } from "../../redux/employees/actionCreators";

const View = () => {
  const supabase = createClient(supabaseUrl, supabaseKey);
  const history = useHistory();
  const dispatch = useDispatch();

  const fetchEmployees = async () => {
    const { data, error } = await supabase.from("employees").select("*");
    if (error) {
      console.error("Error fetching employees:", error);
    } else {
      dispatch(setEmployees(data));
    }
  };

  React.useEffect(() => {
    fetchEmployees();
  }, [dispatch, supabase]);

  return (
    <>
      <Header data-cy="header">View Employees</Header>
      <DataTable reload={fetchEmployees} />
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
