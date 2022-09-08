import { NavLink } from 'react-router-dom';
import AccountMenu from './AccountMenu/AccountMenu';
import s from './Navbar.module.css'
import Navbar from "./Navbar";

const NavbarContainer = (props) => {
	return(
		<Navbar accountMenuItems={props.store.getState().navBar.accountMenuItems}/>
	)
}

export default NavbarContainer;