
import {connect} from "react-redux";
import {
    changePageAC,
    setTotalUsersAC,
    setUsersAC,
    updateSubscribeFollowAC,
    updateSubscribeUnfollowAC
} from "../../redux/users-reducer";
import {Users} from "./Users";

const mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        state: state.usersPage,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateSubscribeFollow: (id) => { dispatch(updateSubscribeFollowAC(id))},
        updateSubscribeUnfollow: (id) => { dispatch(updateSubscribeUnfollowAC(id))},
        setUsers: (users) => { dispatch(setUsersAC(users)) },
        setTotalUsers: (countTotalUsers) => {dispatch(setTotalUsersAC(countTotalUsers) )},
        setChangePage : (page) => {dispatch(changePageAC(page) )}
    }
}

export const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users);