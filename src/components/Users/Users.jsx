import {connect} from "react-redux";
import {
    getUsers, onChangePage, follow, unfollow
} from "../../redux/users-reducer";
import React from "react";
import {UsersComponent} from "./UsersComponent";
import {Preloader} from "../CommonComponents/Preloader/Preloader";
import {withAuthRedirect} from "../HOC/withAuthRedirect";
import {compose} from "redux";
import {getStateSelector, getUsersSelector} from "../../redux/users-selectors";
import {Paginator} from "../CommonComponents/Paginator/Paginator";

export class Users extends React.Component{

    componentDidMount() {
        this.props.getUsers(this.props.state.activePage, this.props.state.usersCountOnPage)
    }

    onChangePage = (p) => {
        this.props.onChangePage(p, this.props.state.usersCountOnPage)
    }

    render() {
        return (
            <div>
                <div>
                    <Paginator totalCount={this.props.state.totalCount} usersCountOnPage={this.props.state.usersCountOnPage} onChangePage={this.onChangePage} activePage={this.props.state.activePage}/>
                </div>
                {this.props.state.isFetching
                    ? <Preloader/>
                    : <UsersComponent
                        state={this.props.state}
                        users={this.props.users}
                        follow={this.props.follow}
                        unfollow={this.props.unfollow}
                        onChangePage={this.onChangePage}
                    />}
            </div>
        )
        }
}

const mapStateToProps = (state) => {

    return {
        users: getUsersSelector(state),
        state: getStateSelector(state),
    }
}

export default compose(
    connect(mapStateToProps,{getUsers, onChangePage, follow, unfollow}),
    withAuthRedirect,
)(Users);
