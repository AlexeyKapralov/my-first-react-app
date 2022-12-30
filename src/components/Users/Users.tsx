import {connect} from "react-redux";
import {FilterType, follow, getUsers, initialDataType, onChangePage, unfollow} from "../../redux/users-reducer";
import React from "react";
import {UsersComponent} from "./UsersComponent";
import {Preloader} from "../CommonComponents/Preloader/Preloader";
import {withAuthRedirect} from "../HOC/withAuthRedirect";
import {compose} from "redux";
import {getStateSelector, getUsersFilter, getUsersSelector} from "../../redux/users-selectors";
import {Paginator} from "../CommonComponents/Paginator/Paginator";
import {AppStateType} from "../../redux/redux-store";
import {UsersSearchForm} from "./UsersSearchForm";


type MapDispatchToProps = {
    getUsers: (activePage: number, usersCountOnPage: number, filter:FilterType) => void
    onChangePage: (page: number, usersCountOnPage: number, filter:FilterType) => void
    follow: (userID: number) => void
    unfollow: (userID: number) => void
}
type MapStateToPropsType = {
    users: []
    state: initialDataType
    filter: FilterType
}
type OwmPropsType = {
    onFilterChanged: (filter: FilterType) => void
}

type PropsType = MapDispatchToProps & MapStateToPropsType & OwmPropsType

export const Users = React.memo(class extends React.Component<PropsType> {

    componentDidMount() {
        this.props.getUsers(this.props.state.activePage, this.props.state.usersCountOnPage, this.props.filter)
    }

    onChangePage = (p: number) => {
        this.props.onChangePage(p, this.props.state.usersCountOnPage, this.props.filter)
    }

    onFilterChanged = (filter: FilterType) => {
        this.props.getUsers(1, this.props.state.usersCountOnPage, filter)
    }

    render() {
        return (
            <div>
                <UsersSearchForm
                    onFilterChanged={this.onFilterChanged}/>
                <div>
                    <Paginator totalCount={this.props.state.totalCount}
                               usersCountOnPage={this.props.state.usersCountOnPage} onChangePage={this.onChangePage}
                               activePage={this.props.state.activePage}/>
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
)

const mapStateToProps = (state: AppStateType) => {

    return {
        users: getUsersSelector(state),
        state: getStateSelector(state),
        filter: getUsersFilter(state)
    }
}

export default compose(
    connect(mapStateToProps, {getUsers, onChangePage, follow, unfollow}),
    withAuthRedirect,
)(Users);
