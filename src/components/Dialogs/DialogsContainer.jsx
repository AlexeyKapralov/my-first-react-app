import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {sendNewMessage, updateTextMessageBody} from "../../redux/dialogs-reducer";
import {withAuthRedirect} from "../HOC/withAuthRedirect";
import {compose} from "redux";

const mapStateToProps = (state) => {
	return {
		dialogs: state.dialogsPage.dialogs,
		messages: state.dialogsPage.messages,
		messageBody: state.dialogsPage.messageBody,
	}
}

export const DialogsContainer = compose(
	connect(mapStateToProps, {updateTextMessageBody,sendNewMessage}),
	withAuthRedirect,
)(Dialogs);