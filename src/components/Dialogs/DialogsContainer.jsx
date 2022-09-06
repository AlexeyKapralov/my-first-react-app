import React from "react";
import { NavLink } from "react-router-dom";
import { updateTextMessageBody } from "../../redux/dialogs-reducer";
import Dialog from "./Dialog/Dialog";
import s from "./Dialogs.module.css";
import Message from "./Message/Message";
import Dialogs from "./Dialogs";
import StoreContext from "../../StoreContext";




const DialogsContainer = (props) => {
	<StoreContext.Consumer>
		{store => {
			return (
				<Dialogs dispatch={store.dispatch} dialogs={store.getState().dialogsPage.dialogs}
						 messages={store.getState().dialogsPage.messages}
						 messageBody={store.getState().dialogsPage.messageBody}/>
			);
		}};
	</StoreContext.Consumer>
}
export default DialogsContainer;