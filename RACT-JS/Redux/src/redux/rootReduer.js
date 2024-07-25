import { combineReducers } from "redux";
import counterReducer from "./counter/counterReducer";
import { FormReducer } from "./form/formReducer";

export const rootReducer = combineReducers({
    counter: counterReducer,
    form: FormReducer
})