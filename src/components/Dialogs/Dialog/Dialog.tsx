import { NavLink } from "react-router-dom";
import s from "./Dialog.module.scss";

type PropsType = {
	name: string
	id: number
}

const Dialog:React.FC<PropsType> = (props) => {
	return (
		<div className={s.dialog}>
			<NavLink to={"/dialogs/"+ props.id} className={s.myLink}>{props.name}</NavLink>
		</div>
	);
};

export default Dialog;