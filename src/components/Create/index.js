import React, { useCallback } from "react";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { createClient } from "@supabase/supabase-js";
import { Flex, Header } from "../styled";
import FormField from "./FormField";
import FormButtons from "./FormButtons";
import formValidationSchema from "./formValidationSchema";
// import { saveNewEmployee } from "../../redux/employees/actionCreators";
import FormSelectField from "./FormSelectField";
import StatusList from "../../default/employee";
import { supabaseKey, supabaseUrl } from "../../configs/supabase";
import { saveNewEmployee } from "../../redux/employees/actionCreators";

const InitialValues = {
  firstName: "",
  surname: "",
  email: "",
  birthDate: "",
  status: "ACTIVE",
  jobTitle: "",
};

const Create = () => {
  const history = useHistory();
  const supabase = createClient(supabaseUrl, supabaseKey);
  const dispatch = useDispatch();

  const submitForm = useCallback(
    async employee => {
      const { data, error } = await supabase
        .from("employees")
        .insert([employee])
        .select();
      if (error) {
        console.error("Error saving employee:", error);
      } else {
        history.push("/view");
        dispatch(saveNewEmployee(data[0]));
      }
    },
    [dispatch]
  );

  return (
    <>
      <Header>Create new employee</Header>
      <Formik
        validationSchema={formValidationSchema}
        onSubmit={submitForm}
        initialValues={InitialValues}
      >
        <Flex alignItems="center" justifyContent="center" height="100%">
          <Flex alignItems="left" direction="column" width="300px">
            <FormField name="firstName" placeholder="First name" />
            <FormField name="surname" placeholder="Surname" />
            <FormField name="email" placeholder="Email" type="email" />
            <FormField name="birthDate" placeholder="Birth Date" type="date" />
            <FormSelectField
              name="status"
              placeholder="Status"
              options={StatusList}
            />
            <FormField name="jobTitle" placeholder="Job title" />
            <FormButtons />
          </Flex>
        </Flex>
      </Formik>
    </>
  );
};

export default Create;
