const ADD_POST = "ADD-POST";

let initialData = {

	posts: [
		{
			id: 1,
			message: "Hello, it's my first message",
		},
		{
			id: 2,
			message: "Hello, it's my second message",
		},
		{
			id: 3,
			message: "Hello, it's my third message",
		}
	]

}

export const profileReducer = (state = initialData, action) => {
	
	switch (action.type) {
		case ADD_POST: {
			return{
				...state,
				posts: [...state.posts, {id: state.posts.length + 1, message: action.newPostText}]
			}
		}
		default:
			return state;
	}
	
	
}

export const addPost = (newPostText) => {
	return { type: ADD_POST , newPostText};
};