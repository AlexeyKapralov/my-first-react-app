import Dialog from "./Dialog/Dialog";
import s from "./Dialogs.module.css";
import Message from "./Message/Message";




const Dialogs = (props) => {

	let dialogsElements = props.state.dialogs.map(dialog => {
		return <Dialog name={dialog.name} id={dialog.id} />
	})
	let messagesElements = props.state.messages.map(message => {
		return <Message message={message.message} />
	})

	return (
		<div className={s.container}>
			<div className={s.messages}>
				{ messagesElements }
			</div>

			<div className={s.dialogs}>
				<div className={s.dialogsTitle}>Dialogs</div>
				{ dialogsElements }
			</div>
		</div>
	);
};

export default Dialogs;