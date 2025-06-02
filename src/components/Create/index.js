import React, { useCallback } from "react";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { Flex, Header } from "../styled";
import FormField from "./FormField";
import FormButtons from "./FormButtons";
import formValidationSchema from "./formValidationSchema";
import { saveNewEmployee } from "../../redux/employees/actionCreators";
import FormSelectField from "./FormSelectField";

const InitialValues = {
  firstName: "",
  surname: "",
  email: "",
  birthDate: "",
  status: "ACTIVE",
  jobTitle: "",
};

const Create = () => {
  const dispatch = useDispatch();
  const submitForm = useCallback(
    employee => {
      console.log({ employee });
      dispatch(saveNewEmployee(employee));
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
              options={[
                { value: "ACTIVE", label: "Active" },
                { value: "LEAVE_OF_ABSENCE", label: "On Leave" },
                { value: "TERMINATED", label: "Terminated" },
              ]}
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
