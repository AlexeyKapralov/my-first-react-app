import CreatePost from './CreatePost/CreatePost';
import Post from './Post/Post';
import s from './Posts.module.css'
import Posts from "./Posts";
import StoreContext from "../../../StoreContext";

const PostsContainer = (props) => {
	<StoreContext.Consumer>
		{store => {
			return (
				<Posts posts={store.getState().profilePage.posts} state={store.getState()}
					   dispatch={store.dispatch}/>
			)
		}}
	</StoreContext.Consumer>

}

export default PostsContainer;