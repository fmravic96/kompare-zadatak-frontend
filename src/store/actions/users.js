import { SET_USERS, ADD_USER, REMOVE_USERS } from "../actionTypes";
import { addError, removeError } from "./errors";
import { call } from "../../services/api";

export const setUsers = (users) => ({
  type: SET_USERS,
  users,
});

export const addUser = (user) => ({
  type: ADD_USER,
  user,
});

export const removeUsers = (ids) => ({
  type: REMOVE_USERS,
  payload: ids,
});

export const getUsers = () => {
  return async (dispatch) => {
    try {
      const users = await call("get", "users");
      dispatch(setUsers(users));
      dispatch(removeError);
    } catch (err) {
      const error = err.response.data;
      dispatch(addError(error.message));
    }
  };
};

export const createUser = (data) => {
  return async (dispatch) => {
    try {
      const user = await call("post", "users", data);
      dispatch(addUser(user));
      dispatch(removeError);
    } catch (err) {
      const error = err.response.data;
      dispatch(addError(error.message));
    }
  };
};

export const deleteUsers = (ids) => {
  return async (dispatch) => {
    try {
      const resultIds = await call("post", "users/delete", ids);
      dispatch(removeUsers(resultIds));
      dispatch(removeError);
    } catch (err) {
      const error = err.response.data;
      dispatch(addError(error.message));
    }
  };
};
