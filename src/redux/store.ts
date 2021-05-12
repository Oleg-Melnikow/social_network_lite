import {combineReducers, createStore, applyMiddleware} from "redux";
import profileReducer from "./profileReducer";
import dialogsReducer from "./dialogsReducer";
import usersReducer from "./usersReducer";
import {authReducer} from "./authReducer";
import thunkMiddleware from "redux-thunk";
import {reducer as formReducer} from "redux-form";

type rootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<rootReducerType>

let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer
});

let store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default store;