import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { store } from './redux/state';
import reportWebVitals from './reportWebVitals';

let reRender = () => {
	const root = ReactDOM.createRoot(document.getElementById('root'));
	root.render(
		<React.StrictMode>
			<App state={store.getState()} addPost={store.addPost.bind(store)} updateNewPostText={store.updateNewPostText.bind(store)} sendNewMessage={store.sendNewMessage.bind(store)} />
		</React.StrictMode>
	);
}

store.subscribe(reRender);

reRender();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
