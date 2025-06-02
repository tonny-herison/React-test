import { createSlice } from "@reduxjs/toolkit";
import { defaultData } from "../../default/data";

const initialState = {
  employees_records: defaultData,
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
