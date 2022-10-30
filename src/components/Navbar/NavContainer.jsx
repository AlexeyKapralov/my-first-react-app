import Navbar from "./Navbar";
import StoreContext from "../../StoreContext";

const NavContainer = (props) => {
	<StoreContext.Consumer>
		{store => {
			return <Navbar navbar={store.getState().navBar}/>
		}

		}
	</StoreContext.Consumer>
}

export default NavContainer;