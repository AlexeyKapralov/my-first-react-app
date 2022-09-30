// import logo from './logo.svg';
import './App.css';
import {Route, Routes, BrowserRouter} from 'react-router-dom';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import NavbarContainer from "./components/Navbar/NavbarContainer";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import {UsersContainer} from "./components/Users/UsersContainer";
import {Profile} from "./components/Profile/Profile";
import HeaderContainer from "./components/Header/HeaderContainer";
import {Login} from "./components/Login/Login";


const App = (props) => {
	return (
		<BrowserRouter>
			<div className='app-wrapper'>
				<HeaderContainer/>
				<NavbarContainer/>
				<Routes>
					<Route path="/profile" element={<Profile/>}/>
					<Route path="/profile/:userId" element={<Profile/>}/>
					<Route path="/dialogs" element={<DialogsContainer/>}/>
					<Route path="/users" element={<UsersContainer/>}/>
					<Route path='/news' element={<News/>}/>
					<Route path='/music' element={<Music />} />
					<Route path='/settings' element={<Settings />} />
					<Route path='/login' element={<Login />} />

				</Routes>
				<aside></aside>
			</div>
		</BrowserRouter>
	);
}



export default App;