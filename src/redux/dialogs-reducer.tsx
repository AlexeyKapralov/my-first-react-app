import {DialogsType, MessageType } from "../types/types";
import {InferActionsType} from "./redux-store";

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
		case "dialogs/SEND-NEW-MESSAGE": {
			return {
				...state,
				messages: [...state.messages, {id: state.messages.length + 1, message: action.message}]
			}
		}
		default:
			return state;
	}
	
}

export const actions = {
	sendNewMessage: (message:string)=> ({type: "dialogs/SEND-NEW-MESSAGE" , message} as const)
}

type tActions = InferActionsType<typeof actions>
