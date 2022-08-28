import Posts from './Posts/Posts';
import s from './Profile.module.css'

const Profile = () => {
	return (
		<div className={s.content}>
			<div className={s.image}>
				<img src="https://www.industrialempathy.com/img/remote/ZiClJf-1920w.jpg" alt="..." />
			</div>
			<div className={s.avatar}>
				<img className={s.photo} src="https://pinotmasters.sk/wp-content/uploads/2014/10/speaker-2-v2.jpg" alt="ava" />
				<div className={s.name}>Anastasia</div>
				<div className={s.description}>Middle Full Stack Developer</div>
			</div>
			<Posts/>
		</div>
	)
}

export default Profile;