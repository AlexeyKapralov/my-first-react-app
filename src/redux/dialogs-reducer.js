const SEND_NEW_MESSAGE = "SEND-NEW-MESSAGE";
const UPDATE_TEXT_MESSAGE_BODY = "UPDATE-TEXT-MESSAGE-BODY"

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
}

export const dialogsReducer = (state = initialData, action) => {
	switch (action.type) {
		case SEND_NEW_MESSAGE: {
			return {
				...state,
				messages: [...state.messages, {id: state.messages.length + 1, message: state.messageBody}],
				messageBody: "",
			}
		}
		case UPDATE_TEXT_MESSAGE_BODY: {
			return {
				...state,
				messageBody: action.messageBody,
			}
		}
		default:
			return state;
	}
	
}

export const updateTextMessageBody = (messageBody) => {
	return { type: UPDATE_TEXT_MESSAGE_BODY, messageBody: messageBody }
}
export const sendNewMessage = () => {
	return { type: SEND_NEW_MESSAGE }
}