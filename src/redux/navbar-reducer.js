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
			urlName: "users",
			title: "Users"
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
	]
}

export const navbarReducer = (state = initialData, action) => {

	return state;
}