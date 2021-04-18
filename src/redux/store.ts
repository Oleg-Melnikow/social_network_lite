import {combineReducers, createStore } from "redux";
import profileReducer from "./profileReducer";

type rootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<rootReducerType>

let rootReducer = combineReducers({
    profilePage: profileReducer
});

let store = createStore(rootReducer);

export default store;