import s from './CreatePost.module.css'

const CreatePost = () => {
	return (
		<div className={s.createPost}>
			<textarea placeholder='Say some nice news for your friens!'></textarea>
			<button>Create post</button>
		</div>
	)
}

export default CreatePost;