const SEND_NEW_MESSAGE = "SEND-NEW-MESSAGE";
const UPDATE_TEXT_MESSAGE_BODY = "UPDATE-TEXT-MESSAGE-BODY"

export const dialogsReducer = (state, action) => {
	switch (action.type) {
		case SEND_NEW_MESSAGE:
			state.messages.push({ id: state.messages.length + 1, message: state.messageBody })
			return state;
		case UPDATE_TEXT_MESSAGE_BODY:
			state.messageBody = action.messageBody;
			return state;
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