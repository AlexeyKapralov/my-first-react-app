const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
const CHANGE_PAGE = "CHANGE_PAGE";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";


let initialData = {
	users:[],
	usersCountOnPage: 100,
	pageNumber: 10,
	activePage: 3,
	totalCount: 100,
	isFetching: false,

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