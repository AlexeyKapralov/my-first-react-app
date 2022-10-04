import CreatePostForm from './CreatePost/CreatePostForm';
import Post from './Post/Post';

const Posts = (props) => {

	let messageElements = props.posts.map (post => {
		return <Post message={post.message} />
	})

	return (
		<div>
			<CreatePostForm addPost={props.addPost}/>
			{messageElements}
		</div>
	)
}

export default Posts;