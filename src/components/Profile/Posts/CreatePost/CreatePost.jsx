import React from 'react';
import { addPostActionCreator, updateNewPostTextActionCreator } from '../../../../redux/state';
import s from './CreatePost.module.css'

const CreatePost = (props) => {

	let textArea = React.createRef();

	const addPost = () => {
		return props.dispatch(addPostActionCreator(textArea.current.value) );
	};

	const updateNewPostText = () => {
		props.dispatch(updateNewPostTextActionCreator(textArea.current.value) );
	};

	return (
		<div className={s.createPost}>
			<textarea onChange={updateNewPostText} ref={textArea} placeholder='Say some nice news for your friens!'></textarea>
			<button onClick={addPost}>Create post</button>
		</div>
	)
}

export default CreatePost;