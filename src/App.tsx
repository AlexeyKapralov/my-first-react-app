import './App.scss';
import {Route, Routes, Navigate} from 'react-router-dom';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import NavbarContainer from "./components/Navbar/NavbarContainer";
import Profile from "./components/Profile/Profile";
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginForm from "./components/Login/LoginForm";
import {useEffect, lazy, Suspense} from "react";
import {Preloader} from "./components/CommonComponents/Preloader/Preloader";
import {connect} from "react-redux";
import {SetAuthData, setIsInit} from "./redux/auth-reducer";
import {AppStateType} from "./redux/redux-store";
import {AuthAPI} from "./api/auth-api";

// import {DialogsContainer} from "./components/Dialogs/DialogsContainer";
const Dialogs = lazy(() => import ('./components/Dialogs/Dialogs'));

// import Users from "./components/Users/Users";
const Users = lazy(() => import ('./components/Users/Users'));


type MapStateToPropsType = {
	isInit: boolean
	isAuth: boolean
}

type MapDispatchToPropsType = {
	SetAuthData: (data: any, isAuth: boolean) => void
	setIsInit: (isInit: boolean) => void
}
type OwnPropsType = {

}
type PropsType = MapStateToPropsType & MapDispatchToPropsType & OwnPropsType

const App: React.FC<PropsType> = props => {

	// App.displayName = 'App';

	useEffect(() => {
		const fetchData = async () => {
			await AuthAPI.authMe().then(data => {
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

	if (!props.isInit) {
		return <Preloader/>
	}
	if (!props.isInit && props.isAuth) {
		return <Navigate to={"/login"}/>
	}

	console.log()
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
								<Dialogs/>
							</Suspense>
						}/>
						<Route path="/users" element={
							<Suspense fallback={<div>Loading...</div>}>
								<Users/>
							</Suspense>
						}/>
						<Route path='/news' element={<div>Sorry. Functionality not implemented</div>}/>
						<Route path='/music' element={<div>Sorry. Functionality not implemented</div>}/>
						<Route path='/settings' element={<div>Sorry. Functionality not implemented</div>}/>
						<Route path='/login' element={<LoginForm/>}/>
						<Route path='*' element={<div>404 Not found</div>}/>
					</Routes>
			</div>
	);
}


const mapStateToProps = (state:AppStateType):MapStateToPropsType => {
	return{
		isInit: state.auth.isInit,
		isAuth: state.auth.isAuth,
	}
}

export default connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStateType>(mapStateToProps, {SetAuthData, setIsInit})(App);