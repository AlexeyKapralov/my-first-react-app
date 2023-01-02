import {useDispatch, useSelector} from "react-redux";
import {FilterType, follow, getUsers, tUserReducerThunk, unfollow} from "../../redux/users-reducer";
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

const Users:React.FC = React.memo(() => {

    const dispatch = useDispatch()

    const users = useSelector(getUsersArraySelector)
    const state = useSelector(getStateSelector)
    const filter = useSelector(getUsersFilter)
    const usersCountOnPage = useSelector(getUsersCountOnPageSelector)
    const activePage = useSelector(getActivePageSelector)
    const totalCount = useSelector(getTotalCountSelector)
    const isFetching = useSelector(getIsFetchingSelector)

    useEffect(() => {
        // @ts-ignore
        dispatch(getUsers(activePage, usersCountOnPage, filter))
    }, [])

    const onChangePage = (p: number) => {
        // @ts-ignore
        dispatch(getUsers(p, usersCountOnPage, filter))
    }

    const onFilterChanged = (filter: FilterType) => {
        // @ts-ignore
        dispatch(getUsers(1, usersCountOnPage, filter))
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
                    follow={follow}
                    unfollow={unfollow}
                    onChangePage={onChangePage}

                />}
        </div>
    )
})

export default Users
