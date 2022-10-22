import React from 'react';
import s from './CreatePost.module.css'
import {useForm} from "react-hook-form";

const CreatePostForm = (props) => {
	const {register, handleSubmit, reset, formState:{errors}} = useForm();
	const onSubmit = data => {
		props.addPost(data.newPostText)
		reset()
	}

	return (
		<form className={s.createPost} onSubmit={handleSubmit(onSubmit)}>
			<textarea {...register("newPostText",
				{required: true, maxLength: 50}
			)} placeholder='Say some nice news for your friens!'/>

			{errors.newPostText?.type === 'required' && <div style={{color:'red', padding: "0rem 1rem 1rem 1.5rem"}} role="alert">Need to write some text</div>}
			{errors.newPostText?.type === 'maxLength' && <div style={{color:'red', padding: "0rem 1rem 1rem 1.5rem"}} role="alert">Max length 50</div>}
			{/*{console.log(errors)}*/}

			<button>Create post</button>
		</form>
	)
}

export default CreatePostForm;