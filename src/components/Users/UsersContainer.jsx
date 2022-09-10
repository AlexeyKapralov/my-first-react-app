
import {connect} from "react-redux";
import {setUsersAC, updateSubscribeFollowAC, updateSubscribeUnfollowAC} from "../../redux/users-reducer";
import {Users} from "./Users";

const mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateSubscribeFollow: (id) => { dispatch(updateSubscribeFollowAC(id))},
        updateSubscribeUnfollow: (id) => { dispatch(updateSubscribeUnfollowAC(id))},
        setUsers: (users) => { dispatch(setUsersAC(users)) }
    }
}

export const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users);