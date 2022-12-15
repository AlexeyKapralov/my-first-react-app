import {actions, profileReducer} from "./profile-reducer";

let state = {
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

it('should add new post', function () {
	let action = actions.addPost("text")
	let newState = profileReducer(state, action)

	expect(newState.posts[3].message).toBe("text")
}); 