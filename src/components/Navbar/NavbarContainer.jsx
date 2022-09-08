import { NavLink } from 'react-router-dom';
import AccountMenu from './AccountMenu/AccountMenu';
import s from './Navbar.module.css'
import Navbar from "./Navbar";
import StoreContext from "../../StoreContext";

const NavbarContainer = (props) => {

	return (
		<StoreContext.Consumer>
			{(store) => {
				return <Navbar accountMenuItems={store.getState().navBar.accountMenuItems}/>
			}}
		</StoreContext.Consumer>)
}

export default NavbarContainer;