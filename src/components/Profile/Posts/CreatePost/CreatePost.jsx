import React from 'react';
import { addPostActionCreator, updateNewPostTextActionCreator } from '../../../../redux/profile-reducer';
import s from './CreatePost.module.css'

const CreatePost = (props) => {

	const addPost = () => {
		return props.dispatch(addPostActionCreator() );
	};

	const updateNewPostText = (e) => {
		props.dispatch(updateNewPostTextActionCreator(e.target.value) );
	};

	return (
		<div className={s.createPost}>
			<textarea onChange={updateNewPostText} value={props.state.profilePage.newPostText} placeholder='Say some nice news for your friens!' autoFocus ></textarea>
			<button onClick={addPost}>Create post</button>
		</div>
	)
}

export default CreatePost;