import React from 'react';
import s from './CreatePost.module.css'

const CreatePost = (props) => {

	let textArea = React.createRef();


	const addPost = () => {
		props.dispatch({ type: "ADD-POST", newMessage: textArea.current.value });
	};

	const updateNewPostText = () => {
		props.dispatch({ type: "UPDATE-NEW-POST-TEXT", text: textArea.current.value });
	};

	return (
		<div className={s.createPost}>
			<textarea onChange={updateNewPostText} ref={textArea} placeholder='Say some nice news for your friens!'></textarea>
			<button onClick={addPost}>Create post</button>
		</div>
	)
}

export default CreatePost;