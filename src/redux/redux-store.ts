import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {dialogsReducer} from "./dialogs-reducer";
import {profileReducer} from "./profile-reducer";
import {navbarReducer} from "./navbar-reducer";
import {usersReducer} from "./users-reducer";
import {AuthReducer} from "./auth-reducer";
import thunkMiddleware from "redux-thunk";

let RootReducer = combineReducers({
    dialogsPage: dialogsReducer,
    profilePage: profileReducer,
    navBar: navbarReducer,
    usersPage: usersReducer,
    auth: AuthReducer,
})

type PropertiesType<T> = T extends {[key: string]: infer U} ? U : never

export type InferActionsType<T extends {[key: string]: (...args: any[])=>any}> = ReturnType<PropertiesType<T>>

type RootReducerType = typeof RootReducer
export type AppStateType = ReturnType<RootReducerType>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(RootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));

// @ts-ignore
window.__store__ = store;