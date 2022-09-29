import {applyMiddleware, combineReducers, createStore} from "redux";
import {dialogsReducer} from "./dialogs-reducer";
import {profileReducer} from "./profile-reducer";
import {navbarReducer} from "./navbar-reducer";
import {usersReducer} from "./users-reducer";
import {AuthReducer} from "./auth-reducer";
import thunkMiddleware from "redux-thunk"

let reducers = combineReducers({
    dialogsPage: dialogsReducer,
    profilePage: profileReducer,
    navBar: navbarReducer,
    usersPage: usersReducer,
    auth: AuthReducer,
})
export let store = createStore( reducers, applyMiddleware(thunkMiddleware) );

window.store = store;