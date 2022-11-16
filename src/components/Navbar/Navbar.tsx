import AccountMenu from './AccountMenu/AccountMenu';
import s from './Navbar.module.scss'
import { MapStateToPropsNavbarContainerType } from './NavbarContainer';

const Navbar:React.FC<MapStateToPropsNavbarContainerType> = (props) => {

	const AccountMenuElements = props.accountMenuItems.map( item => {
		return <AccountMenu menuBtn={s.menuBtn} nav={s.nav} key={item.urlName} urlName = {item.urlName} title={item.title} />
	})

	return (
		<>
			<div onClick={() => {
				const elem = document.getElementsByClassName(s.nav)[0]
				const btn = document.getElementsByClassName(s.menuBtn)[0]
				if (elem.className === s.nav + ' ' + s.active) {
					elem.className = s.nav;
					document.body.style.overflow = "visible";
					btn.className = s.menuBtn
				} else {
					elem.className = s.nav + ' ' + s.active;
					document.body.style.overflow = "hidden";
					btn.className = s.menuBtn + ' ' + s.active
				}


			}} className={s.menuBtn}>
				<span></span>
				<span></span>
				<span></span>
			</div>

			<nav className={s.nav}>

				<div className={s.account}>
					<div  className={s.title}>Account</div>
					{AccountMenuElements}
				</div>
			</nav>
		</>
	)
}

export default Navbar