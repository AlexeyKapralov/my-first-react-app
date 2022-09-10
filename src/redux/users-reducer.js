const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";

let initialData = {
	users:[]
}

export const usersReducer = (state = initialData, action) => {
	switch (action.type) {
		case FOLLOW: {
			return {
				...state,
				users: state.users.map ( u => {
					if (u.id === action.id){
						return {...u, subscriber: "follow"}
					} return u
				} )
			}
		}
		case UNFOLLOW: {
			return {
				...state,
				users: state.users.map ( u => {
					if (u.id === action.id){
						return {...u, subscriber: "unfollow"}
					} return u
				} )
			}
		}

		case SET_USERS: {
			return {...state, users: [...state.users, ...action.users]}
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
	return { type: SET_USERS, users: users}
}