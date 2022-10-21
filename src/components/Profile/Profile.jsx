import s from './Profile.module.scss'
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
	const [img, setImg] = useState();
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

	const setPhotoFunction = async (e) => {
		if (e.target.files.length){
			const result = await ProfileAPI.setPhoto(e.target.files[0])
			if (result.data.resultCode === 0) {
				setImg(result.data.data.photos.large)
			}
		}
	}

	return (
		(!props.auth.isAuth && !userId)
		? <Navigate to={"/login"}/>
		: <div className={s.profile}>
				<div className={s.about}>
					<div className={s.image}>
						<img src="https://www.industrialempathy.com/img/remote/ZiClJf-1920w.jpg" alt="..."/>
					</div>
					<div className={s.avatar}>
						<div className={s.photo}>
							{
								img === null
									? <img
										src="https://media.istockphoto.com/vectors/user-icon-male-avatar-in-business-suitvector-flat-design-vector-id843193172"
										alt="ava"/>
									: <img src={img} alt="ava"/>
							}
						</div>
						<div className={s.nameAndDesc}>
							<div className={s.name}>{post.fullName}</div>
							<div className={s.description}>Middle Full Stack Developer</div>
						</div>
					</div>

					{userId === props.auth.data.id &&
						<div className={s.setPhoto}>
							<input id="input__file" accept="image/jpeg,image/png,image/gif" type="file" onChange={setPhotoFunction}/>
							<label for="input__file">Change photo</label>
						</div>
						
					}

					<div className={s.setAvatar}></div>

					<div className={s.profileStatus}>
						{(isStatusEditMode && (userId === props.auth.data.id) )
							? <div><input onChange={e => (setStatus(e.target.value))} onBlur={isChangeStatus} autoFocus
										  className={s.statusTitleInput} value={status}/></div>
							:
							<div onDoubleClick={() => (setEditMode(true))} className={s.statusTitleSpan}>{status}</div>
						}
					</div>
				</div>
				<PostsContainer/>
			</div>
	)
}

const MapStateToProps = (state) =>  {
	return {
		profile: state.profilePage.profile,
		users: state.usersPage.users,
		auth: state.auth
	}
}

export default compose (
	connect(MapStateToProps, {setUsers}),
	// withAuthRedirect,
)(Profile)