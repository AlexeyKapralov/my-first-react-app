import {instance} from "./api";

type tGetCaptchaUrl = {
    url: string
}
export const CaptchaAPI = {
    getCaptchaUrl() {
        return instance.get<tGetCaptchaUrl>(`security/get-captcha-url`).then(response => (response))
    }
}