import s from './Post.module.css'
import React from "react";

type PropsType = {
	message: string
}

const Post:React.FC<PropsType> = (props) => {
	return (
			<div className={s.post}>
				{props.message}
			</div>
	)
}

export default Post;