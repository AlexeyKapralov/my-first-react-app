import {instance} from "./api";

type ContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}
type PhotoType = {
    small: string | null
    large: string | null
}
export type tProfileData = {
    userId: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullname: string
    contacts: ContactsType
}

type tSetData<D={}> = {
    resultCode: number
    messages: Array<String>
    data: D
}
export type tGetProfile = {
    userId: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullname: string
    aboutMe: string
    contacts: ContactsType
    photos: PhotoType
}
export const ProfileAPI = {
    getProfile(userId: string) {
        return instance.get<tGetProfile>(`profile/${userId}`).then(response => (response.data))
    },
    setStatus(status: string) {
        return instance.put<tSetData>(`profile/status`, {status: status}).then(response => (response.data))
    },
    getStatus(userId: string) {
        return instance.get<string>(`profile/status/${userId}`)
    },
    setPhoto(photo: File) {
        const formData = new FormData();
        formData.append("image", photo);

        return instance.put<tSetData<PhotoType>>('profile/photo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

    },
    setNewProfileData(data: tProfileData) {
        return instance.put<tSetData>('profile', data)
    },
}