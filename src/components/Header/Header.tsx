import s from './Header.module.scss';
import {NavLink} from "react-router-dom";
import SiteLogo from "../../assets/Logo.jpg"
import React from "react";

type PropsType = {
	isAuth: boolean
	login: string | null
	Logout: () => void
}

export const Header: React.FC<PropsType> = (props) => {
	return(
		<header className={s.header}>
			<img src={SiteLogo} alt="" />
			{ props.isAuth
				? <div className={s.loginTrue}>
					<span>{props.login}</span>
					<div><button onClick={props.Logout}>Logout</button></div>
				</div>
				: <NavLink to="/login" className={s.loginFalse}>Login</NavLink>
			}
		</header>
	)
}