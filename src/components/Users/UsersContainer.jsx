
import {connect} from "react-redux";
import {
    changePageAC,
    setTotalUsersAC,
    setUsersAC, toggleIsFetchingAC,
    updateSubscribeFollowAC,
    updateSubscribeUnfollowAC
} from "../../redux/users-reducer";
import React from "react";
import axios from "axios";

import {UsersComponent} from "./UsersComponent";
import {Preloader} from "../Preloader/Preloader";

export class UsersClass extends React.Component{

    componentDidMount() {
        this.props.toggleIsFetching(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.state.activePage}&count=${this.props.state.usersCountOnPage}`).then(response => {
            this.props.toggleIsFetching(false)
            this.props.setUsers(response.data.items);
            this.props.setTotalUsers(response.data.totalCount);
        });
    }

    onChangePage = (p) => {
        this.props.setChangePage(p);
        this.props.toggleIsFetching(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${p}&count=${this.props.state.usersCountOnPage}`).then(response => {
            this.props.toggleIsFetching(false)
            this.props.setUsers(response.data.items);
        });
    }

    render() { return (
        <div>
            { this.props.state.isFetching ? <Preloader /> : null}
            <UsersComponent
                state = {this.props.state}
                users = {this.props.users}
                onChangePage = {this.onChangePage}
                updateSubscribeFollow = {this.props.updateSubscribeFollow}
                updateSubscribeUnfollow = {this.props.updateSubscribeUnfollow}/>

        </div>
    )
        }
}

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
        setChangePage : (page) => {dispatch(changePageAC(page) )},
        toggleIsFetching: (isFetching) => {dispatch(toggleIsFetchingAC(isFetching))}
    }
}

export const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(UsersClass);