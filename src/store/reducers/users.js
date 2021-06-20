import { SET_USERS, ADD_USER } from "../actionTypes";

export const users = (state = null, action) => {
  switch (action.type) {
    case SET_USERS:
      return action.users;
    case ADD_USER:
      return [...state, action.user];
    default:
      return state;
  }
};
