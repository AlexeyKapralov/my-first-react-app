const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";

export const profileReducer = (state, action) => {
	
	switch (action.type) {
		case ADD_POST:
			state.posts.push({ id: state.posts.length + 1, message: state.newPostText })
			return state;
		case UPDATE_NEW_POST_TEXT:
			state.newPostText = action.text;
			return state;
		default:
			return state;
	}
	
	
}

export const addPostActionCreator = () => {
	return { type: ADD_POST };
};

export const updateNewPostTextActionCreator = (text) => {
	return { type: UPDATE_NEW_POST_TEXT, text: text }
}
