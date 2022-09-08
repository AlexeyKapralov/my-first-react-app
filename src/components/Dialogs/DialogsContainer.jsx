import React from "react";
import { NavLink } from "react-router-dom";
import { updateTextMessageBody } from "../../redux/dialogs-reducer";
import Dialog from "./Dialog/Dialog";
import s from "./Dialogs.module.css";
import Message from "./Message/Message";
import Dialogs from "./Dialogs";




const DialogsContainer = (props) => {
	return (
		<Dialogs dialogs={props.store.getState().dialogsPage.dialogs}
				 messages={props.store.getState().dialogsPage.messages}
				 messageBody={props.store.getState().dialogsPage.messageBody}
				 dispatch={props.store.dispatch}/>
	);
};

export default DialogsContainer;