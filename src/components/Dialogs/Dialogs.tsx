import {connect} from "react-redux";
import {sendNewMessage} from "../../redux/dialogs-reducer";
import {withAuthRedirect} from "../HOC/withAuthRedirect";
import {compose} from "redux";
import {DialogsType, MessageType} from "../../types/types";
import {AppStateType} from "../../redux/redux-store";
import React from "react";
import Dialog from "./Dialog/Dialog";
import Message from "./Message/Message";
import s from "./Dialogs.module.scss";
import {SendMessageForm} from "./Message/SendMessageForm";

type MapStateToPropsType = {
	dialogs: Array<DialogsType>
	messages: Array<MessageType>
	messageBody: string
}

type MapDispatchToPropsType = {
	sendNewMessage: (message:string) => void
}

type OwnPropsType = {

}

type PropsType = MapStateToPropsType & MapDispatchToPropsType & OwnPropsType

const mapStateToProps = (state: AppStateType) => {
	return {
		dialogs: state.dialogsPage.dialogs,
		messages: state.dialogsPage.messages,
		messageBody: state.dialogsPage.messageBody
	}
}

const Dialogs:React.FC<PropsType> = (props) => {

	const sendNewMessage = (message:string) => {
		props.sendNewMessage(message);
	}

	let dialogsElements = props.dialogs.map(dialog => {
		return <Dialog name={dialog.name} id={dialog.id} />
	})
	let messagesElements = props.messages.map(message => {
		return <Message message={message.message}/>
	})


	return (
		<div className={s.container}>
			<div className={s.messages}>
				{ messagesElements }
				<div className={s.sendMessage}>

					<SendMessageForm sendNewMessage={sendNewMessage}/>

				</div>
			</div>

			<div className={s.dialogs}>
				<div className={s.dialogsTitle}>Dialogs</div>
				{ dialogsElements }
			</div>
		</div>
	);
};


export default compose(
	connect(mapStateToProps, {sendNewMessage}),
	withAuthRedirect
)(Dialogs);