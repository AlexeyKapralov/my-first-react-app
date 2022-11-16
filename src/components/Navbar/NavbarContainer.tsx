import Navbar from "./Navbar";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import { AccountMenuItemType } from "../../redux/navbar-reducer";

export type MapStateToPropsNavbarContainerType = {
	accountMenuItems: Array<AccountMenuItemType>
}
const mapStateToProps = (state: AppStateType) => {
	return {
		accountMenuItems: state.navBar.accountMenuItems
	}
}
const NavbarContainer = connect(mapStateToProps)(Navbar);

export default NavbarContainer;