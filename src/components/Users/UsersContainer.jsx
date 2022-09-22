
import {connect} from "react-redux";
import {
    changePage, setChangePage,
    setTotalUsers,
    setUsers, toggleIsFetching, ToggleFollowingUserID,
    updateSubscribeFollow,
    updateSubscribeUnfollow
} from "../../redux/users-reducer";
import React from "react";

import {UsersComponent} from "./UsersComponent";
import {Preloader} from "../Preloader/Preloader";
import {UsersAPI} from "../../api/api";

export class UsersClass extends React.Component{

    componentDidMount() {
        this.props.toggleIsFetching(true)
        UsersAPI.getUsers(this.props.users.activePage, this.props.users.usersCountOnPage).then(data => {
            this.props.toggleIsFetching(false)
            this.props.setUsers(data.items);
            this.props.setTotalUsers(data.totalCount);
        });
    }

    onChangePage = (p) => {
        this.props.setChangePage(p);
        this.props.toggleIsFetching(true)
        UsersAPI.getUsers(p, this.props.state.usersCountOnPage).then(data => {
            this.props.toggleIsFetching(false)
            this.props.setUsers(data.items);
        });
    }

    render() { return (
        <div>
            { this.props.state.isFetching ? <Preloader /> : null }
            <UsersComponent
                state = {this.props.state}
                users = {this.props.users}
                onChangePage = {this.onChangePage}
                updateSubscribeFollow = {this.props.updateSubscribeFollow}
                updateSubscribeUnfollow = {this.props.updateSubscribeUnfollow}
                ToggleFollowingUserID = {this.props.ToggleFollowingUserID}
                usersAPI = {UsersAPI}
            />

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

export const UsersContainer = connect(mapStateToProps,
    {updateSubscribeFollow, updateSubscribeUnfollow, setUsers, setTotalUsers, setChangePage, toggleIsFetching, ToggleFollowingUserID})
(UsersClass);