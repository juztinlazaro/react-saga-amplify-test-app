import { combineReducers } from "redux";
import appReducer from "./App/app.reducer";

const rootReducers = combineReducers({
  app: appReducer
});

export default rootReducers;
