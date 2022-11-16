import { NavLink } from 'react-router-dom';
import s from './AccountMenu.module.scss'

const AccountMenu = (props:any) => {
	return(
		<div className={s.AccountMenuItem}>
			<NavLink  to={`/${props.urlName}`}
					  onClick={()=>{
						  const elem = document.getElementsByClassName(props.nav)[0]
						  const btn = document.getElementsByClassName(props.menuBtn)[0]
						  elem.className = props.nav
						  document.body.style.overflow="visible"
						  btn.className = props.menuBtn}}
					  className={({isActive}) => isActive ? s.activeLink : undefined}>{props.title}</NavLink>
		</div>
	)
}

export default AccountMenu;