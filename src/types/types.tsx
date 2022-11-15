import message from "../components/Dialogs/Message/Message";

export type MessageType = {
    id:number
    message: string
}
export type DialogsType = {
    id:number
    name: string
}
export interface ILoginFormFields {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}
