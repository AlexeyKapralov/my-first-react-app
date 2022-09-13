import styles from "./Users.module.css";
import React from "react";

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
                            <div className={styles.avatar}>
                                {   u.photos.large === null
                                    ? <img className={styles.avatar} src="https://media.istockphoto.com/vectors/male-avatar-on-white-background-user-icon-vector-illustration-vector-id1191084605" alt="..."/>
                                    : <img className={styles.avatar} src={u.photos.large} alt="..."/>
                                }
                            </div>
                            <div className={styles.name}>
                                {u.name}
                            </div>
                            <div className={styles.id}>
                                {u.id}
                            </div>
                            <div>
                                { u.followed === false
                                    ? <button onClick={() => {props.updateSubscribeFollow(u.id)}} className={styles.follow}>FOLLOW</button>
                                    : <button onClick={() => {props.updateSubscribeUnfollow(u.id)}} className={styles.follow}>UNFOLLOW</button>
                                }
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}