import styles from "./Users.module.scss";
import React from "react";
import {NavLink} from "react-router-dom";
import {Paginator} from "../CommonComponents/Paginator/Paginator";

export const UsersComponent = (props) => {

    return (
        <div>
            <div className={styles.users}>
                {props.users.map((u) => {
                    return (
                        <div className={styles.user}>
                            <NavLink to={`/profile/${u.id}`}>
                                <div className={styles.avatar}>
                                    {u.photos.large === null
                                        ? <img className={styles.avatar}
                                               src="https://hwchamber.co.uk/wp-content/uploads/2022/04/avatar-placeholder.gif"
                                               alt="..."/>
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
                                {u.followed === false
                                    ? <button disabled={props.state.isToggleFollowingUserID.some(i => i === u.id)}
                                              onClick={() => {

                                                  props.follow(u.id);


                                              }} className={styles.follow}>FOLLOW</button>

                                    : <button disabled={props.state.isToggleFollowingUserID.some(i => i === u.id)}
                                              onClick={() => {

                                                  props.unfollow(u.id);

                                              }} className={styles.unfollow}>UNFOLLOW</button>
                                }
                            </div>
                        </div>
                    )
                })
                }
            </div>
        </div>
    )
}