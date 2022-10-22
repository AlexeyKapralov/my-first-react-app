import CreatePostForm from './CreatePost/CreatePostForm';
import styles from "./Posts.module.scss"
import Post from './Post/Post';
import {AboutProfile} from "./About/AboutProfile";

const Posts = ({addPost, posts, post,userId, propsUserId,setNewProfileData}) => {

	let messageElements = posts.map (post => {
		return <Post key={post.id} message={post.message} />
	})


	return (
		<div>
			<div className={styles.wrapper}>
				<AboutProfile post={post} userId={userId} propsUserId={propsUserId} setNewProfileData={setNewProfileData}/>
				<CreatePostForm addPost={addPost}/>
			</div>
			{messageElements}
		</div>
	)
}

export default Posts;