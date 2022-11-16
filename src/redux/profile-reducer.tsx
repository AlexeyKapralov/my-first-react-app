
const ADD_POST = "profile/ADD-POST";

export type PostType = {
	id: number
	message: string
}

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
	] as Array<PostType>
}

export type initialDataType = typeof initialData

export const profileReducer = (state = initialData, action:tActions):initialDataType => {
	
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

type tActions = AddPostActionType
type AddPostActionType = {
	type: typeof ADD_POST
	newPostText: string
}
export const addPost = (newPostText:string):AddPostActionType => {
	return { type: ADD_POST , newPostText};
};