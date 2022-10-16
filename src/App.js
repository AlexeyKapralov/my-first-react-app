// import logo from './logo.svg';
import './App.css';
import {Route, Routes, Navigate} from 'react-router-dom';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import NavbarContainer from "./components/Navbar/NavbarContainer";
import Profile from "./components/Profile/Profile";
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginForm from "./components/Login/LoginForm";
import {AuthAPI} from "./api/api";
import {useEffect, lazy, Suspense} from "react";
import {Preloader} from "./components/CommonComponents/Preloader/Preloader";
import {connect} from "react-redux";
import {SetAuthData, setIsInit} from "./redux/auth-reducer";

// import {DialogsContainer} from "./components/Dialogs/DialogsContainer";
const DialogsContainer = lazy(() => import ('./components/Dialogs/DialogsContainer'));

// import Users from "./components/Users/Users";
const Users = lazy(() => import ('./components/Users/Users'));


const App = (props) => {

	useEffect(() => {
		const fetchData = () => {
			AuthAPI.authMe().then(data => {
				if ( data.resultCode === 0 ) {
					props.SetAuthData(data, true)
					props.setIsInit(true)
				}else{
					props.setIsInit(true)
				}
			})
		}
		fetchData()
	}, [])

	if (!props.state.isInit) {
		return <Preloader/>
	}
	if (!props.state.isInit && props.state.isAuth) {
		return <Navigate to={"/login"}/>
	}

	return (

			<div className='app-wrapper'>
				<HeaderContainer/>
				<NavbarContainer/>

					<Routes>
						<Route path="/" element={<Profile/>}/>
						<Route path="/profile" element={<Profile/>}/>
						<Route path="/profile/:userId" element={<Profile/>}/>
						<Route path="/dialogs" element={
							<Suspense fallback={<div>Loading...</div>}>
								<DialogsContainer/>
							</Suspense>
						}/>
						<Route path="/users" element={
							<Suspense fallback={<div>Loading...</div>}>
								<Users/>
							</Suspense>
						}/>
						<Route path='/news' element={<News/>}/>
						<Route path='/music' element={<Music/>}/>
						<Route path='/settings' element={<Settings/>}/>
						<Route path='/login' element={<LoginForm/>}/>
					</Routes>
				<aside></aside>
			</div>
	);
}


const mapStateToProps = (state) => {
	return{
		state: state.auth
	}
}

export default connect(mapStateToProps, {SetAuthData, setIsInit})(App);