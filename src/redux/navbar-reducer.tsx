export type AccountMenuItemType = {
	urlName: string
	title: string
}

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
	] as Array<AccountMenuItemType>
}
export type InitialStateType = typeof initialData;


export const navbarReducer = (state = initialData):InitialStateType => {
	return state;
}