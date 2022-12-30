import styles from "./Users.module.scss";
import React from "react";
import {NavLink} from "react-router-dom";
import {Paginator} from "../CommonComponents/Paginator/Paginator";
import {initialDataType, UserType} from "../../redux/users-reducer";

type MapDispatchToPropsType = {
    onChangePage: (page: number, usersCountOnPage: number) => void
    follow: (userID: number) => void
    unfollow: (userID: number) => void
}

type MapStateToPropsType = {
    users: []
    state: initialDataType
}

type OwmPropsType = {}

type Props = MapDispatchToPropsType & MapStateToPropsType & OwmPropsType

export const UsersComponent:React.FC<Props> = (props) => {

    return (
        <div>
            <div className={styles.users}>
                {props.users.map((u: UserType) => {
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
                                {!u.followed
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