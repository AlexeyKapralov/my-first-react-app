import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {sendNewMessage, updateTextMessageBody} from "../../redux/dialogs-reducer";
import {withAuthRedirect} from "../HOC/withAuthRedirect";

const mapStateToProps = (state) => {
	return {
		dialogs: state.dialogsPage.dialogs,
		messages: state.dialogsPage.messages,
		messageBody: state.dialogsPage.messageBody,
	}
}

let DialogsContainerWithRedirect = withAuthRedirect(Dialogs)

const DialogsContainer = connect(mapStateToProps, {updateTextMessageBody,sendNewMessage})(DialogsContainerWithRedirect)




export default DialogsContainer;