import Navbar from "./Navbar";
import {connect} from "react-redux";

const mapStateToProps = (state) => {
	return {
		accountMenuItems: state.navBar.accountMenuItems
	}
}
const mapDispatchToProps = (dispatch) => {
	return {

	}
}
const NavbarContainer = connect(mapStateToProps, mapDispatchToProps)(Navbar);



export default NavbarContainer;