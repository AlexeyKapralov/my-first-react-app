// import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import Profile from './components/Profile/Profile';
import {Route, Routes, BrowserRouter} from 'react-router-dom';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import NavbarContainer from "./components/Navbar/NavbarContainer";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import {UsersContainer} from "./components/Users/UsersContainer";


const App = (props) => {
	return (
		<BrowserRouter>
			<div className='app-wrapper'>
				<Header/>
				<NavbarContainer/>
				<Routes>
					<Route path="/profile" element={<Profile/>}/>
					<Route path="/dialogs" element={<DialogsContainer/>}/>
					<Route path="/users" element={<UsersContainer/>}/>
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