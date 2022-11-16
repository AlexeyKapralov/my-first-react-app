import {DialogsType, MessageType } from "../types/types";

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
	] as Array<DialogsType>,
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
	] as Array<MessageType>,
	messageBody: "",
}

export const dialogsReducer = (state = initialData, action: tActions) => {
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
type tActions = SendNewMessageActionType

type SendNewMessageActionType = {
	type: typeof SEND_NEW_MESSAGE
	message: string
}
export const sendNewMessage = (message:string):SendNewMessageActionType => {
	return { type: SEND_NEW_MESSAGE , message}
}