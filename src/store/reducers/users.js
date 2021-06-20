import { SET_USERS } from "../actionTypes";

export const users = (state = null, action) => {
  switch (action.type) {
    case SET_USERS:
      return action.users;
    default:
      return state;
  }
};
