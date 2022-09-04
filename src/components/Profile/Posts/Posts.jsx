import CreatePost from './CreatePost/CreatePost';
import Post from './Post/Post';
import s from './Posts.module.css'

const Posts = (props) => {

	let messageElements = props.posts.map (post => {
		return <Post message={post.message} />
	})

	return (
		<div>
			<CreatePost addPost={props.addPost} updateNewPostText={props.updateNewPostText}/>
			{messageElements}
		</div>
	)
}

export default Posts;