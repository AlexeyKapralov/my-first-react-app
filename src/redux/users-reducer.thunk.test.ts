import {actions, follow, unfollow} from "./users-reducer";
import {tUnfollowFollow, UsersAPI} from "../api/users-api";
jest.mock("../api/users-api")
const UserAPIMock = UsersAPI as jest.Mocked<typeof UsersAPI>

const dispatchMock = jest.fn()
const getStateMock = jest.fn()

beforeEach(()=>{
    //зачистка
    dispatchMock.mockClear()
    getStateMock.mockClear()
})

const result:tUnfollowFollow = {
    resultCode: 0,
    messages: [],
    data:{}
}




test("success follow thunk", async () => {
    const thunk = follow(1)

    UserAPIMock.follow.mockReturnValue(Promise.resolve(result))

    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingUserID(1, true))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.toggleFollowingUserID(1, false))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.updateSubscribeFollow(1))
    
})
test("success unfollow thunk", async () => {
    const thunk = unfollow(1)

    UserAPIMock.unfollow.mockReturnValue(Promise.resolve(result))

    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingUserID(1, true))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.toggleFollowingUserID(1, false))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.updateSubscribeUnfollow(1))

})