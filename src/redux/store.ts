import {combineReducers, createStore } from "redux";
import profileReducer from "./profileReducer";
import dialogsReducer from "./dialogsReducer";

type rootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<rootReducerType>

let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
});

let store = createStore(rootReducer);

export default store;