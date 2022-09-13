import styles from "./Users.module.css";
import axios from "axios";
import React from "react";

export class Users extends React.Component{

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.state.activePage}&count=${this.props.state.usersCountOnPage}`).then(response => {
            this.props.setUsers(response.data.items);
            this.props.setTotalUsers(response.data.totalCount);
        });
    }

    onChangePage = (p) => {
        this.props.setChangePage(p);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${p}&count=${this.props.state.usersCountOnPage}`).then(response => {
            this.props.setUsers(response.data.items);
        });
    }

    render() {
        let pagesCount = Math.ceil(this.props.state.totalCount / this.props.state.usersCountOnPage)

        let pages =[]
        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i)
        }

        return (
            <div>
                <div>
                    {pages.map((p) => {
                        if (this.props.state.activePage === p ) {
                             return <span onClick={ (e) => { this.onChangePage(p) }} className={styles.activePage}>{p} </span>
                        }else
                            {
                               return  <span onClick={ (e) => { this.onChangePage(p) }}>{p} </span>
                            }
                    }
                    )}
                </div>
                {
                this.props.users.map( (u)=>{
                    return (
                        <div>
                            <div className={styles.avatar}>
                                {   u.photos.small === null
                                    ? <img className={styles.avatar} src="https://media.istockphoto.com/vectors/male-avatar-on-white-background-user-icon-vector-illustration-vector-id1191084605" alt="..."/>
                                    : <img src={u.avatar} alt="..."/>
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
                                    ? <button onClick={() => {this.props.updateSubscribeFollow(u.id)}} className={styles.follow}>FOLLOW</button>
                                    : <button onClick={() => {this.props.updateSubscribeUnfollow(u.id)}} className={styles.follow}>UNFOLLOW</button>
                                }
                            </div>
                        </div>
                    )
                })
                }
            </div>
        )
    }
}