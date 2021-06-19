import { SET_USERS } from "../actionTypes";
import { addError, removeError } from "./errors";
import { call } from "../../services/api";

export const setUsers = (users) => ({
  type: SET_USERS,
  users,
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
