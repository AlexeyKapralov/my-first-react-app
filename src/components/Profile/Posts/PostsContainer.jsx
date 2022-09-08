import CreatePost from './CreatePost/CreatePost';
import Post from './Post/Post';
import s from './Posts.module.css'
import Posts from "./Posts";
import StoreContext from "../../../StoreContext";

const PostsContainer = (props) => {
	return (
		<StoreContext.Consumer>
			{store => {
				return (
					<Posts posts={store.getState().profilePage.posts}
						   newPostText={store.getState().profilePage.newPostText}
						   dispatch={store.dispatch}/>
				)
			}}
		</StoreContext.Consumer>
	)
}

export default PostsContainer;