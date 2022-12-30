import {actions, initialDataType, usersReducer} from "./users-reducer";

let state: initialDataType

beforeEach(()=>{
    state = {
        users: [
            {
                id:0,
                followed:false,
                name: "Alexey 0",
                photos:{
                    small: null,
                    large:null
                },
                status: "status 0"
            },
            {
                id:1,
                followed:false,
                name: "Alexey 1",
                photos:{
                    small: null,
                    large:null
                },
                status: "status 1"
            },
            {
                id:2,
                followed:true,
                name: "Alexey 2",
                photos:{
                    small: null,
                    large:null
                },
                status: "status 2"
            },
            {
                id:3,
                followed:true,
                name: "Alexey 3",
                photos:{
                    small: null,
                    large:null
                },
                status: "status 3"
            },
        ],
        usersCountOnPage: 50,
        pageNumber: 10,
        activePage: 1,
        totalCount: 100,
        isFetching: false,
        isToggleFollowingUserID: [],
        filter: {
            term:'',
            friend: null as null | boolean
        }
    }
})

test("follow success ", () => {
    const newState = usersReducer(state, actions.updateSubscribeFollow(1))
    expect(newState.users[0].followed).toBeFalsy()
    expect(newState.users[1].followed).toBeTruthy()
})
test("unfollow success ", () => {
    const newState = usersReducer(state, actions.updateSubscribeUnfollow(3))
    expect(newState.users[2].followed).toBeTruthy()
    expect(newState.users[3].followed).toBeFalsy()
})