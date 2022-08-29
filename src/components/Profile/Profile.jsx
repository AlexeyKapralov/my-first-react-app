import Posts from './Posts/Posts';
import s from './Profile.module.css'

const Profile = () => {
	return (
		<div className={s.profile}>
			<div className={s.about}>
				<div className={s.image}>
					<img src="https://www.industrialempathy.com/img/remote/ZiClJf-1920w.jpg" alt="..." />
				</div>
				<div className={s.avatar}>
					<div className={s.photo}>
						<img  src="https://pinotmasters.sk/wp-content/uploads/2014/10/speaker-2-v2.jpg" alt="ava" />
					</div>
					<div className={s.nameAndDesc}>
						<div className={s.name}>Anastasia</div>
						<div className={s.description}>Middle Full Stack Developer</div>
					</div>
				</div>
			</div>
			<Posts/>
		</div>
	)
}

export default Profile;