import CreatePostForm from './CreatePost/CreatePostForm';
import styles from "./Posts.module.scss"
import Post from './Post/Post';
import {AboutProfileForm} from "./About/AboutProfileForm";

const Posts = ({addPost, posts, post,userId, propsUserId,setNewProfileData, exErrors}) => {

	let messageElements = posts.map (post => {
		return <Post key={post.id} message={post.message} />
	})


	return (
		<div>
			<div className={styles.wrapper}>
				<AboutProfileForm exErrors={exErrors} post={post} userId={userId} propsUserId={propsUserId} setNewProfileData={setNewProfileData}/>
				<CreatePostForm addPost={addPost}/>
			</div>
			{messageElements}
		</div>
	)
}

export default Posts;