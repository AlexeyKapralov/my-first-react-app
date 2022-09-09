import Posts from "./Posts";
import {connect} from "react-redux";


const mapStateToProps = (state) => {
	return {
		posts: state.profilePage.posts,
		newPostText: state.profilePage.newPostText
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		dispatch: dispatch
	}
}

const PostsContainer = connect(mapStateToProps, mapDispatchToProps)(Posts)


export default PostsContainer;