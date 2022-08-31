import { NavLink } from 'react-router-dom';
import s from './AccountMenu.module.css'

const AccountMenu = (props) => {
	return(
		<div className={s.AccountMenuItem}>
			<NavLink to={`/${props.urlName}`} className={({isActive}) => isActive ? s.activeLink : undefined}>{props.title}</NavLink>
		</div>
	)
}

export default AccountMenu;