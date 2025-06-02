import { createSlice } from "@reduxjs/toolkit";

const defaultEmployee = {
  id: new Date().getTime(),
  firstName: "Abe",
  surname: "Simpson",
  email: "abe.simpson@springfield.com",
  birthDate: "1907-05-25",
  jobTitle: "Work grouch",
  status: "ACTIVE",
};

const initialState = {
  employees_records: [defaultEmployee],
};

const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    saveNewEmployee: {
      prepare: employee => ({
        payload: { ...employee, id: new Date().getTime() },
      }),
      reducer(draftState, action) {
        draftState.employees_records = [
          ...draftState.employees_records,
          action.payload,
        ];
      },
    },
    editEmployee: {
      prepare: employee => ({
        payload: { ...employee },
      }),
      reducer(draftState, action) {
        const index = draftState.employees_records.findIndex(
          emp => emp.id === action.payload.id
        );
        if (index !== -1) {
          draftState.employees_records[index] = action.payload;
        }
      },
    },
    deleteEmployee: {
      prepare: id => ({
        payload: id,
      }),
      reducer(draftState, action) {
        draftState.employees_records = draftState.employees_records.filter(
          emp => emp.id !== action.payload
        );
      },
    },
  },
});

export const { saveNewEmployee, editEmployee, deleteEmployee } =
  employeeSlice.actions;

export default employeeSlice.reducer;
