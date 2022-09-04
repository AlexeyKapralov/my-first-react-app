let reRender;

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
		newPostText: 'some text',
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
	reRender(state, addPost, updateNewPostText, sendNewMessage);
}

export let updateNewPostText = (text) => {
	state.profilePage.newPostText = text;
}

export let sendNewMessage = (textMessage) => {
	state.dialogsPage.messages.push({ id: state.dialogsPage.messages.length + 1, message: textMessage })
	reRender(state, addPost, updateNewPostText, sendNewMessage);
}

export let subscribe = (observer) => {
	reRender = observer;
}


export default state;