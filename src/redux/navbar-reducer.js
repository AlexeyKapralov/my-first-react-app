let initialData = {

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
		},
		{
			urlName: "users",
			title: "Users"
		}
	]
}

export const navbarReducer = (state = initialData, action) => {

	return state;
}