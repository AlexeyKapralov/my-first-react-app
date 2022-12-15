import {InferActionsType} from "./redux-store";


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
		case "profile/ADD-POST": {
			return{
				...state,
				posts: [...state.posts, {id: state.posts.length + 1, message: action.newPostText}]
			}
		}
		default:
			return state;
	}
	
	
}

type tActions = InferActionsType<typeof actions>

export const actions = {
	addPost: (newPostText:string) => ({type: "profile/ADD-POST" , newPostText} as const)
}