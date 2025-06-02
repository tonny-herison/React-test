import React, { useCallback } from "react";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router";
import { createClient } from "@supabase/supabase-js";
import { Flex, Header } from "../styled";
import FormButtons from "./FormButtons";
import FormField from "../Create/FormField";
import FormSelectField from "../Create/FormSelectField";
import { editEmployee } from "../../redux/employees/actionCreators";
import formValidationSchema from "../Create/formValidationSchema";
import { supabaseKey, supabaseUrl } from "../../configs/supabase";

const InitialValues = {
  firstName: "",
  surname: "",
  email: "",
  birthDate: "",
  status: "ACTIVE",
  jobTitle: "",
};

const Edit = () => {
  const supabase = createClient(supabaseUrl, supabaseKey);
  const dispatch = useDispatch();
  const records = useSelector(state => state.employees);
  const { id } = useParams();
  const history = useHistory();

  const employee = React.useMemo(() => {
    return records.employees_records.find(emp => emp.id === parseInt(id, 10));
  }, [records, id]);

  const submitForm = useCallback(
    async _employee => {
      const { data, error } = await supabase
        .from("employees")
        .update({ ..._employee })
        .eq("id", id)
        .select();
      if (error) {
        console.error("Error updating employee:", error);
        return;
      }
      dispatch(editEmployee(data[0]));
      history.push("/view");
    },
    [dispatch, history, id]
  );

  return (
    <>
      <Header>Edit employee</Header>
      <Formik
        validationSchema={formValidationSchema}
        onSubmit={submitForm}
        initialValues={employee || InitialValues}
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

export default Edit;
