import s from "./Dialogs.module.css";

const Dialogs = (props) => {
	return (
		<div className={s.div}>
			Hello {props.familia}
		</div>
	);
};

export default Dialogs;