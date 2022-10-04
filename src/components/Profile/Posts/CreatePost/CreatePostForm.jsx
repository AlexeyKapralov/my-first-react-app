import React from 'react';
import s from './CreatePost.module.css'
import {useForm} from "react-hook-form";

const CreatePostForm = (props) => {
	const {register, handleSubmit, reset} = useForm();
	const onSubmit = data => {
		props.addPost(data.newPostText)
		reset()
	}

	return (
		<form className={s.createPost} onSubmit={handleSubmit(onSubmit)}>
			<textarea {...register("newPostText")} placeholder='Say some nice news for your friens!'/>
			<button>Create post</button>
		</form>
	)
}

export default CreatePostForm;