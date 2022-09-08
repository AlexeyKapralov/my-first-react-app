import React from "react";
import { NavLink } from "react-router-dom";
import { updateTextMessageBody } from "../../redux/dialogs-reducer";
import Dialog from "./Dialog/Dialog";
import s from "./Dialogs.module.css";
import Message from "./Message/Message";




const Dialogs = (props) => {

	const changeTextMessageBody = (e) => {
		props.dispatch(updateTextMessageBody(e.target.value))
	}

	const sendNewMessage = () => {
		props.dispatch ({type: "SEND-NEW-MESSAGE" });
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
					<div className={s.container}>
						<input autoFocus onChange={changeTextMessageBody} value={props.messageBody} type="text" placeholder="Write your message!!!"/>
						<div onClick={sendNewMessage} className={s.button}>
							<NavLink to="">
								<img src="https://cdn-icons-png.flaticon.com/512/3526/3526788.png" alt="..." />
							</NavLink>
						</div>
					</div>
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