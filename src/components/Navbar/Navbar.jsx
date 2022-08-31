import { NavLink } from 'react-router-dom';
import AccountMenu from './AccountMenu/AccountMenu';
import s from './Navbar.module.css'

const Navbar = (props) => {

	const AccountMenuElements = props.state.accountMenuItems.map( item => {
		return <AccountMenu urlName = {item.urlName} title={item.title}/>
	})

	return(
		<nav className={s.nav}>
			<div className={s.account}>
				<div className={s.title}>Account</div>
				{AccountMenuElements}
			</div>
		</nav>
	)
}

export default Navbar;