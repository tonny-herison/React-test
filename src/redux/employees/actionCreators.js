import * as actions from ".";

export const setEmployees = employees => dispatch => {
  dispatch(actions.setEmployees(employees));
};

/* eslint-disable import/prefer-default-export */
export const saveNewEmployee = employee => dispatch => {
  dispatch(actions.saveNewEmployee(employee));
};

export const editEmployee = employee => dispatch => {
  dispatch(actions.editEmployee(employee));
};

export const deleteEmployee = id => dispatch => {
  dispatch(actions.deleteEmployee(id));
};
