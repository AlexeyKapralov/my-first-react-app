const SEND_NEW_MESSAGE = "dialogs/SEND-NEW-MESSAGE";

let initialData = {

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
			message: "Hi"
		},
		{
			id: 3,
			message: "How are you"
		},
		{
			id: 4,
			message: "I'm great. Thank you. How are you?"
		},
		{
			id: 5,
			message: "Not bad"
		}
	],
	messageBody: "",
}

export const dialogsReducer = (state = initialData, action) => {
	switch (action.type) {
		case SEND_NEW_MESSAGE: {
			return {
				...state,
				messages: [...state.messages, {id: state.messages.length + 1, message: action.message}]
			}
		}
		default:
			return state;
	}
	
}
export const sendNewMessage = (message) => {
	return { type: SEND_NEW_MESSAGE , message}
}