import styles from "./Users.module.css";
import React from "react";
import {NavLink} from "react-router-dom";

export const UsersComponent = (props) => {

    let pagesCount = Math.ceil(props.state.totalCount / props.state.usersCountOnPage)

    let pages =[]
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return (
        <div>
            <div>
                {pages.map((p) => {
                        if (props.state.activePage === p ) {
                            return <span onClick={ (e) => { props.onChangePage(p) }} className={styles.activePage}>{p} </span>
                        }else
                        {
                            return  <span onClick={ (e) => { props.onChangePage(p) }}>{p} </span>
                        }
                    }
                )}
            </div>
            {
                props.users.map( (u)=>{
                    return (
                        <div>
                            <NavLink to={`/profile/${u.id}`}>
                                <div className={styles.avatar}>
                                    {   u.photos.large === null
                                        ? <img className={styles.avatar} src="https://media.istockphoto.com/vectors/male-avatar-on-white-background-user-icon-vector-illustration-vector-id1191084605" alt="..."/>
                                        : <img className={styles.avatar} src={u.photos.large} alt="..."/>
                                    }
                                </div>
                            </NavLink>
                            <div className={styles.name}>
                                {u.name}
                            </div>
                            <div className={styles.id}>
                                {u.id}
                            </div>
                            <div>
                                { u.followed === false
                                    ? <button disabled={props.state.IsToggleFollowingUserID === u.id} onClick={() => {

                                        props.ToggleFollowingUserID(u.id)
                                        props.usersAPI.follow(u.id).then(data => {
                                            props.ToggleFollowingUserID(u.id)
                                            if (data.resultCode === 0) {
                                                props.updateSubscribeFollow(u.id)
                                            }

                                        })


                                    }} className={styles.follow}>FOLLOW</button>

                                    : <button disabled={props.state.IsToggleFollowingUserID === u.id} onClick={() => {

                                        props.ToggleFollowingUserID(u.id)
                                        props.usersAPI.unfollow(u.id).then(data => {
                                            props.ToggleFollowingUserID(u.id)
                                            if (data.resultCode === 0) {
                                                props.updateSubscribeUnfollow(u.id)
                                            }
                                        })
                                    }} className={styles.follow}>UNFOLLOW</button>
                                }
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}