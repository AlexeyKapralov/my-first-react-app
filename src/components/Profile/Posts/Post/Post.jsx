import s from './Post.module.css'

const Post = (props) => {
	return (
			<div className={s.post}>
				{props.message}
			</div>
	)
}

export default Post;