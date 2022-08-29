import Dialog from "./Dialog/Dialog";
import s from "./Dialogs.module.css";
import Message from "./Message/Message";

let dialogs = [
	{
		id: 1,
		name: "Alexey",
	},
	{
		id:2,
		name: "Mikhail"
	},
	{
		id:3,
		name:"Anzhela"
	}
]

let messages = [
	{
		id:1,
		message:"Hello"
	},
	{
		id:2,
		message:"I love React"
	},
	{
		id:3,
		message:"And maybe Anzhela too"
	},
	{
		id:4,
		message:"But I'm so fear it"
	},
	{
		id:5,
		message:"Because I never say about it"
	}
]

let dialogsElements = dialogs.map( dialog => {
	return <Dialog name={dialog.name} id={dialog.id} />
})
let messagesElements = messages.map( message => {
	return <Message message={message.message} />
} )

const Dialogs = (props) => {
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