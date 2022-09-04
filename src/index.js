import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import state, { addPost, updateNewPostText, sendNewMessage, subscribe } from "./redux/state"

let reRender = (state, addPost, updateNewPostText, sendNewMessage) => {
	const root = ReactDOM.createRoot(document.getElementById('root'));
	root.render(
		<React.StrictMode>
			<App state={state} addPost={addPost} updateNewPostText={updateNewPostText} sendNewMessage={sendNewMessage} />
		</React.StrictMode>
	);
}

subscribe(reRender);

reRender(state, addPost, updateNewPostText, sendNewMessage);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
