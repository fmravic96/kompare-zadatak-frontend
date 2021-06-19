import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import rootReducer from "./reducers";

const DEFAULT_STATE = {
  errors: { message: null },
};

export const store = createStore(rootReducer, DEFAULT_STATE, applyMiddleware(thunk));
