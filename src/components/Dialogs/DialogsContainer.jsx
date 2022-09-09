import Dialogs from "./Dialogs";
import {connect} from "react-redux";

const mapStateToProps = (state) => {
	return {
		dialogs: state.dialogsPage.dialogs,
		messages: state.dialogsPage.messages,
		messageBody: state.dialogsPage.messageBody
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		dispatch: dispatch
	}
}
const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs)




export default DialogsContainer;