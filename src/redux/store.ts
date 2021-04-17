import {combineReducers, createStore } from "redux";

type rootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<rootReducerType>

let rootReducer = combineReducers({});

let store = createStore(rootReducer);

export default store;