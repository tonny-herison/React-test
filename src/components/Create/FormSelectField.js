import React from "react";
import { Field, useFormikContext } from "formik";
import SelectField from "./styled/SelectField";
import ErrorMessage from "./styled/ErrorMessage";
import { Box } from "../styled";

const FormSelectField = ({ name, placeholder, options }) => {
  const { errors, touched } = useFormikContext();
  return (
    <Box marginBottom="md">
      <Field name={name}>
        {({ field, meta }) => (
          <SelectField
            data-cy={`${name}Input`}
            fontSize="lg"
            placeholder={placeholder}
            fluid
            error={meta.error && meta.touched}
            {...field}
          >
            <option value="" disabled>
              {placeholder}
            </option>
            {options && options.length > 0
              ? options.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))
              : null}
          </SelectField>
        )}
      </Field>
      {errors[name] && touched[name] && (
        <ErrorMessage data-cy={`${name}ErrorMessage`}>
          {errors[name]}
        </ErrorMessage>
      )}
    </Box>
  );
};

export default FormSelectField;
