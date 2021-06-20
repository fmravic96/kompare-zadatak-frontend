import { SET_USERS, ADD_USER, REMOVE_USERS } from "../actionTypes";

export const users = (state = null, action) => {
  switch (action.type) {
    case SET_USERS:
      return action.users;
    case ADD_USER:
      return [...state, action.user];
    case REMOVE_USERS:
      const users = state.filter((user) => {
        return !action.payload.ids.includes(user._id);
      });
      return users;
    default:
      return state;
  }
};
