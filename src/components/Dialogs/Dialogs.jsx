import React from "react";
import Dialog from "./Dialog/Dialog";
import s from "./Dialogs.module.css";
import Message from "./Message/Message";
import {SendMessageForm} from "./Message/SendMessageForm";


const Dialogs = (props) => {

	const sendNewMessage = (message) => {
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


export default Dialogs;