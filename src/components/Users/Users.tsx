import {useDispatch, useSelector} from "react-redux";
import {FilterType, follow, getUsers, unfollow} from "../../redux/users-reducer";
import React, {useEffect} from "react";
import {UsersComponent} from "./UsersComponent";
import {Preloader} from "../CommonComponents/Preloader/Preloader";
import {
    getActivePageSelector,
    getIsFetchingSelector,
    getStateSelector, getTotalCountSelector,
    getUsersArraySelector,
    getUsersCountOnPageSelector,
    getUsersFilter
} from "../../redux/users-selectors";
import {Paginator} from "../CommonComponents/Paginator/Paginator";
import {UsersSearchForm} from "./UsersSearchForm";
import {AppDispatch} from "../../redux/redux-store";

const Users:React.FC = React.memo(() => {

    const dispatch = useDispatch<AppDispatch>()

    const users = useSelector(getUsersArraySelector)
    const state = useSelector(getStateSelector)
    const filter = useSelector(getUsersFilter)
    const usersCountOnPage = useSelector(getUsersCountOnPageSelector)
    const activePage = useSelector(getActivePageSelector)
    const totalCount = useSelector(getTotalCountSelector)
    const isFetching = useSelector(getIsFetchingSelector)

    useEffect(() => {
        dispatch(getUsers(activePage, usersCountOnPage, filter))
    }, [])

    const onChangePage = (p: number) => {
        dispatch(getUsers(p, usersCountOnPage, filter))
    }

    const onFilterChanged = (filter: FilterType) => {
        dispatch(getUsers(1, usersCountOnPage, filter))
    }
    const onFollow = (userID: number) => {
        dispatch(follow(userID))
    }
    const onUnfollow = (userID: number) => {
        dispatch(unfollow(userID))
    }

    return (
        <div>
            <UsersSearchForm
                onFilterChanged={onFilterChanged}/>
            <div>
                <Paginator totalCount={totalCount}
                           usersCountOnPage={usersCountOnPage} onChangePage={onChangePage}
                           activePage={activePage}/>
            </div>
            {isFetching
                ? <Preloader/>
                : <UsersComponent
                    state={state}
                    users={users}
                    follow={onFollow}
                    unfollow={onUnfollow}
                    onChangePage={onChangePage}

                />}
        </div>
    )
})

export default Users
