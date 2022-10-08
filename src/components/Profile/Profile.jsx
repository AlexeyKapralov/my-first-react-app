import s from './Profile.module.css'
import PostsContainer from "./Posts/PostsContainer";
import {connect} from "react-redux";
import {setUsers} from "../../redux/users-reducer";
import {useEffect, useState} from "react";
import {Navigate, useParams} from "react-router-dom";
import {ProfileAPI} from "../../api/api";
import {compose} from "redux";

const Profile = (props) => {
	let {userId} = useParams()
	const [post, setPost] = useState([]);
	const [img, setImg] = useState('https://media.istockphoto.com/vectors/user-icon-male-avatar-in-business-suitvector-flat-design-vector-id843193172');
	const [status, setStatus] = useState('no status');
	const [isStatusEditMode, setEditMode] = useState(false)

	if (!userId) {
		userId = props.auth.data.id
	}

	useEffect(()=>{
		if (userId) {
			ProfileAPI.getProfile(userId).then(data => {
					setPost(data);
					setImg(data.photos.large);
				}
			)
		}
	}, [userId])

	useEffect(()=>{
		if (userId) {
			ProfileAPI.getStatus(userId).then(response => {
					if (response.data === null) {
						setStatus('no status')
					} else (setStatus(response.data))
				}
			)
		}
	}, [userId])

	let isChangeStatus = () => {
		if (userId) {
			setEditMode(false)
			ProfileAPI.setStatus(status).then(response => {
					if (response.resultCode === 0) {
						console.log("All is good")
					}
				}
			)
		}
	}

	return (
		(!userId)
		? <Navigate to={"/login"}/>

		: <div className={s.profile}>
			<div className={s.about}>
				<div className={s.image}>
					<img src="https://www.industrialempathy.com/img/remote/ZiClJf-1920w.jpg" alt="..." />
				</div>
				<div className={s.avatar}>
					<div className={s.photo}>
						{
							img === null
							? <img  src="https://media.istockphoto.com/vectors/user-icon-male-avatar-in-business-suitvector-flat-design-vector-id843193172" alt="ava" />
 							: <img  src={img} alt="ava" />
						}
					</div>
					<div className={s.nameAndDesc}>
						<div className={s.name}>{post.fullName}</div>
						<div className={s.description}>Middle Full Stack Developer</div>
					</div>
				</div>
				<div className={s.profileStatus}>
					{(isStatusEditMode)
						? <div><input onChange={ e => ( setStatus(e.target.value) )} onBlur={ isChangeStatus } autoFocus className={s.statusTitleInput} value={status}/></div>
						: <div onDoubleClick={ () => ( setEditMode(true)) } className={s.statusTitleSpan}>{status}</div>
					}
				</div>
			</div>
			<PostsContainer/>
		</div>
	)
}

const MapStateToProps = (state) =>  {
	return {
		users: state.usersPage.users,
		auth: state.auth
	}
}

export default compose (
	connect(MapStateToProps, {setUsers}),
)(Profile)