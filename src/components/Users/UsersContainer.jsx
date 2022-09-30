import {connect} from "react-redux";
import {
    getUsers, onChangePage, follow, unfollow
} from "../../redux/users-reducer";
import React from "react";
import {UsersComponent} from "./UsersComponent";
import {Preloader} from "../Preloader/Preloader";
import {withAuthRedirect} from "../HOC/withAuthRedirect";

export class UsersClass extends React.Component{

    componentDidMount() {
        this.props.getUsers(this.props.users.activePage, this.props.users.usersCountOnPage)
    }

    onChangePage = (p) => {
        this.props.onChangePage(p, this.props.state.usersCountOnPage)
    }

    render() { return (
        <div>
            { this.props.state.isFetching ? <Preloader /> : null }
            <UsersComponent
                state = {this.props.state}
                users = {this.props.users}
                follow = {this.props.follow}
                unfollow = {this.props.unfollow}
                onChangePage = {this.onChangePage}
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

let UsersContainerWithRedirect = withAuthRedirect(UsersClass)

export const UsersContainer = connect(mapStateToProps,
    {getUsers, onChangePage, follow, unfollow})
(UsersContainerWithRedirect);