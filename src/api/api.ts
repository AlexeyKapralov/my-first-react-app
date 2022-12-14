import axios from "axios";

export const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    withCredentials:true,
    headers: {
        "API-KEY": "a5656080-b348-40d8-a859-ae26d4a30ea1",
    }
})
