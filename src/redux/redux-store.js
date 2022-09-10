import {combineReducers, createStore} from "redux";
import {dialogsReducer} from "./dialogs-reducer";
import {profileReducer} from "./profile-reducer";
import {navbarReducer} from "./navbar-reducer";
import {usersReducer} from "./users-reducer";

let reducers = combineReducers({
    dialogsPage: dialogsReducer,
    profilePage: profileReducer,
    navBar: navbarReducer,
    usersPage: usersReducer
})
export let store = createStore(reducers);

window.store = store;