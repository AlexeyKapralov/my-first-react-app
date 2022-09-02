import { reRender } from "../render";

const state = {

	dialogsPage: {
		dialogs: [
			{
				id: 1,
				name: "Alexey",
			},
			{
				id: 2,
				name: "Mikhail"
			},
			{
				id: 3,
				name: "Anzhela"
			}
		],
		messages: [
			{
				id: 1,
				message: "Hello"
			},
			{
				id: 2,
				message: "I love React"
			},
			{
				id: 3,
				message: "And maybe Anzhela too"
			},
			{
				id: 4,
				message: "But I'm so fear it"
			},
			{
				id: 5,
				message: "Because I never say about it"
			}
		],
	},

	profilePage: {
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
		],
	},

	navBar: {
		accountMenuItems:[
			{
				urlName: "profile",
				title: "Profile"
			},
			{
				urlName: "dialogs",
				title: "Messages"
			},
			{
				urlName: "news",
				title: "News"
			},
			{
				urlName: "music",
				title: "Music"
			},
			{
				urlName: "settings",
				title: "Settings"
			}
		]
	}
}

export let addPost = (newMessage) => {
	state.profilePage.posts.push({id: 5, message : newMessage})
	reRender(state, addPost);
}


export default state;