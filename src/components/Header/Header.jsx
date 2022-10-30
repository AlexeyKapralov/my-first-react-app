import s from './Header.module.scss';
import {NavLink} from "react-router-dom";
import SiteLogo from "../../assets/Logo.jpg"

export const Header = (props) => {
	return(
		<header className={s.header}>
			<img src={SiteLogo} alt="" />
			{ props.state.isAuth === true
				? <div className={s.loginTrue}>
					<span>{props.state.data.login}</span>
					<div><button onClick={props.Logout}>Logout</button></div>
				</div>
				: <NavLink to="/login" className={s.loginFalse}>Login</NavLink>
			}
		</header>
	)
}