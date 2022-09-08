import CreatePost from './CreatePost/CreatePost';
import Post from './Post/Post';
import s from './Posts.module.css'
import Posts from "./Posts";

const PostsContainer = (props) => {
	return (
		<Posts posts={props.store.getState().profilePage.posts}
			   newPostText={props.store.getState().profilePage.newPostText}
			   dispatch={props.store.dispatch}/>
	)
}

export default PostsContainer;