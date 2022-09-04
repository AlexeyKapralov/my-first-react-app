export let store = {
	reRender(){},

	_state: {

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
	},

	getState (){
		return this._state;
	},

	dispatch (action) {
		if (action.type = "ADD-POST"){
			this._state.profilePage.posts.push({ id: this._state.dialogsPage.messages.length + 1, message: action.newMessage })
			this.reRender();

		} else if (action.type = "UPDATE-NEW-POST-TEXT"){
			this._state.profilePage.newPostText = action.text;

		} else if (action.type = "SEND-NEW-MESSAGE"){
			this._state.dialogsPage.messages.push({ id: this._state.dialogsPage.messages.length + 1, message: action.textMessage })
			this.reRender();
		}
	},

	// addPost (newMessage) {
	// 	this._state.profilePage.posts.push({ id: this._state.dialogsPage.messages.length + 1, message : newMessage})
	// 	this.reRender();
	// },

	// updateNewPostText (text) {
	// 	this._state.profilePage.newPostText = text;
	// },

	// sendNewMessage (textMessage) {
	// 	this._state.dialogsPage.messages.push({ id: this._state.dialogsPage.messages.length + 1, message: textMessage })
	// 	this.reRender();
	// },

	subscribe (observer) {
		this.reRender = observer;
	}
}