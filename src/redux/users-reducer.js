import {UsersAPI} from "../api/api";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
const CHANGE_PAGE = "CHANGE_PAGE";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const TOGGLE_IS_FOLLOWING = "TOGGLE_IS_FOLLOWING";


let initialData = {
	users:[],
	usersCountOnPage: 100,
	pageNumber: 10,
	activePage: 3,
	totalCount: 100,
	isFetching: false,
	isToggleFollowingUserID: []

}

export const usersReducer = (state = initialData, action) => {
	switch (action.type) {
		case FOLLOW: {
			return {
				...state,
				users: state.users.map ( u => {
					if (u.id === action.id){
						return {...u, followed: true}
					} return u
				} )
			}
		}
		case UNFOLLOW: {
			return {
				...state,
				users: state.users.map ( u => {
					if (u.id === action.id){
						return {...u, followed: false}
					} return u
				} )
			}
		}
		case SET_USERS: {
			return {...state, users: [...action.users]}
		}
		case SET_TOTAL_USERS_COUNT: {
			return {...state, totalCount: action.countTotalUsers}
		}
		case CHANGE_PAGE: {
			return {...state, activePage: action.page}
		}
		case TOGGLE_IS_FETCHING: {
			return {...state, isFetching: action.isFetching}
		}
		case TOGGLE_IS_FOLLOWING: {
			return {
				...state,
				isToggleFollowingUserID:
					action.isFetch === true
					? [action.IsToggleFollowingUserID]
					: state.isToggleFollowingUserID.filter(i => i != action.IsToggleFollowingUserID)
				}
		}
		default:
			return state;
	}
	
}

export const updateSubscribeFollow = (id) => {
	return { type: FOLLOW, id: id }
}
export const updateSubscribeUnfollow = (id) => {
	return { type: UNFOLLOW, id: id }
}
export const setUsers = (users) => {
	return {type: SET_USERS, users: users}
}
export const setTotalUsers = (countTotalUsers) => {
	return { type: SET_TOTAL_USERS_COUNT, countTotalUsers}
}
export const setChangePage = (page) => {
	return { type: CHANGE_PAGE, page}
}
export const toggleIsFetching = (isFetching) => {
	return { type: TOGGLE_IS_FETCHING, isFetching}
}
export const ToggleFollowingUserID = (IsToggleFollowingUserID, isFetch) => {
	return { type: TOGGLE_IS_FOLLOWING, IsToggleFollowingUserID, isFetch}
}
// below thunk functions

export const getUsers = (activePage, usersCountOnPage) => {
	return (dispatch) => {
		dispatch(toggleIsFetching(true))
		UsersAPI.getUsers(activePage, usersCountOnPage).then(data => {
			dispatch(toggleIsFetching(false))
			dispatch(setUsers(data.items));
			dispatch(setTotalUsers(data.totalCount));
		});
	}
}
export const onChangePage = (page, usersCountOnPage) => {
	return (dispatch) => {
		dispatch(setChangePage(page));
		dispatch(toggleIsFetching(true))
		UsersAPI.getUsers(page, usersCountOnPage).then(data => {
			dispatch(toggleIsFetching(false))
			dispatch(setUsers(data.items));
		});
	}
}
export const follow = (userID) => {
	return (dispatch) => {
		dispatch(ToggleFollowingUserID(userID, true))
		UsersAPI.follow(userID).then(data => {
			dispatch(ToggleFollowingUserID(userID, false))
			if (data.resultCode === 0) {
				dispatch(updateSubscribeFollow(userID))
			}

		})
	}
}
export const unfollow = (userID) => {
	return (dispatch) => {
		dispatch(ToggleFollowingUserID(userID, true))
		UsersAPI.unfollow(userID).then(data => {
			dispatch(ToggleFollowingUserID(userID, false))
			if (data.resultCode === 0) {
				dispatch(updateSubscribeUnfollow(userID))
			}
		})
	}
}
