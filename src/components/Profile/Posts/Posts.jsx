import CreatePost from './CreatePost/CreatePost';
import Post from './Post/Post';
import s from './Posts.module.css'

const Posts = () => {
	return (
		<div>
			<CreatePost />
			<Post message="Hello, it's my first message"/>
			<Post message="Hello, it's my second message" />
		</div>
	)
}

export default Posts;