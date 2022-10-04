import s from './Header.module.css';
import {NavLink} from "react-router-dom";

const Header = (props) => {
	return(
		<header className={s.header}>
			<img src="https://logos-world.net/wp-content/uploads/2020/04/Huawei-Logo.png" alt="" />
			{ props.state.isAuth === true
				? <div>{props.state.data.login}</div>
				: <NavLink to="/login">Login</NavLink>
			}
		</header>
	)
}

export default Header;