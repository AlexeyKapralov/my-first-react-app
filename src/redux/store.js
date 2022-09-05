import { dialogsReducer } from "./dialogs-reducer";
import { navbarReducer } from "./navbar-reducer";
import { profileReducer } from "./profile-reducer";

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
					message: "And maybe someone too"
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
			messageBody: "",
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
			newPostText: '',
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
		this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
		this._state.profilePage = profileReducer(this._state.profilePage, action);
		this._state.navBar = navbarReducer(this._state.navBar, action);
		this.reRender();
	},

	subscribe (observer) {
		this.reRender = observer;
	}
	
}