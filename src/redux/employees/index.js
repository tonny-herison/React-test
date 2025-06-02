import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  employees_records: [],
};

const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    setEmployees: {
      prepare: employees => ({
        payload: employees,
      }),
      reducer(draftState, action) {
        draftState.employees_records = action.payload;
      },
    },
    saveNewEmployee: {
      prepare: employee => ({
        payload: { ...employee },
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

export const { setEmployees, saveNewEmployee, editEmployee, deleteEmployee } =
  employeeSlice.actions;

export default employeeSlice.reducer;
