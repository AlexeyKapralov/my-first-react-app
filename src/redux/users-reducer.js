const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
const CHANGE_PAGE = "CHANGE_PAGE";

let initialData = {
	users:[],
	usersCountOnPage: 100,
	pageNumber: 10,
	activePage: 3,
	totalCount: 100,

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
		default:
			return state;
	}
	
}

export const updateSubscribeFollowAC = (id) => {
	return { type: FOLLOW, id: id }
}
export const updateSubscribeUnfollowAC = (id) => {
	return { type: UNFOLLOW, id: id }
}
export const setUsersAC = (users) => {
	return {type: SET_USERS, users: users}
}
export const setTotalUsersAC = (countTotalUsers) => {
	return { type: SET_TOTAL_USERS_COUNT, countTotalUsers}
}
export const changePageAC = (page) => {
	return { type: CHANGE_PAGE, page}
}