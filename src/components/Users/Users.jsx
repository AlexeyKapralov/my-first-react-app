import styles from "./Users.module.css";


export const Users = (props) => {
    if (props.users.length === 0) {
        props.setUsers([
            {
                id:1,
                avatar: 'http://sociala.uitheme.net/assets/images/user_2.png',
                name: 'Aliqa Macale',
                email: 'support@gmail.com',
                subscriber: "follow"
            },
            {
                id:2,
                avatar: 'http://sociala.uitheme.net/assets/images/user-1.png',
                name: 'Hendrix Stamp',
                email: 'support@gmail.com',
                subscriber: "unfollow"
            },
            {
                id:3,
                avatar: 'http://sociala.uitheme.net/assets/images/user-21.png',
                name: 'Stephen Grider',
                email: 'support@gmail.com',
                subscriber: "follow"
            }
        ]);
    }

    return (
        <div>
            {
                props.users.map( (u)=>{
                    return (
                        <div>
                            <div className={styles.avatar}>
                                <img src={u.avatar} alt="..."/>
                            </div>
                            <div className={styles.name}>
                                {u.name}
                            </div>
                            <div className={styles.email}>
                                {u.email}
                            </div>
                            <div>
                                { u.subscriber === "unfollow"
                                    ? <button onClick={() => {props.updateSubscribeFollow(u.id)}} className={styles.follow}> {u.subscriber} </button>
                                    : <button onClick={() => {props.updateSubscribeUnfollow(u.id)}} className={styles.follow}> {u.subscriber} </button>
                                }
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}