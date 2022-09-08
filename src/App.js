// import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import Dialogs from './components/Dialogs/Dialogs';
import {Route, Routes, BrowserRouter} from 'react-router-dom';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import NavbarContainer from "./components/Navbar/NavbarContainer";


const App = (props) => {
	return (

		<BrowserRouter>
			<div className='app-wrapper'>
				<Header/>
				<NavbarContainer store={props.store} state={props.state.navBar}/>
				<Routes>
					<Route path="/profile" element={<Profile state={props.state.profilePage} dispatch={props.dispatch} />}/>
					<Route path="/dialogs" element={<Dialogs state={props.state.dialogsPage} dispatch={props.dispatch} />}/>
					<Route path='/news' element={<News/>}/>
					<Route path='/music' element={<Music />} />
					<Route path='/settings' element={<Settings />} />
				</Routes>
				<aside></aside>
			</div>
		</BrowserRouter>
	);
}

export default App;