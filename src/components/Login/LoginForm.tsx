import React, {ReactNode} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {connect} from "react-redux";
import {actions, Login, Logout} from "../../redux/auth-reducer";
import {Navigate} from "react-router-dom";
import styles from "./LoginForm.module.scss"
import {AppStateType} from "../../redux/redux-store";
import {ILoginFormFields} from "../../types/types";


type MapDispatchToPropsType = {
    SetAuthData:(data:object, isAuth:boolean)=>void
    Login:(data:any)=>void
    Logout:()=>void
}
type MapStateToPropsType = {
    captcha: string | null
    messages: {} | null
    isAuth: boolean
}
type OwnPropsType = {

}

type PropsType = MapDispatchToPropsType & MapStateToPropsType & OwnPropsType

export const LoginForm: React.FC<PropsType> = props => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<ILoginFormFields>();
    const onSubmit:SubmitHandler<ILoginFormFields> = (data) => {
        props.Login(data)
        reset()
    }

    return (
        (props.isAuth)
            ? <Navigate to={"/profile"}/>
            : <div className={styles.wrapper}>
                <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>

                    <div>


                        <input className={styles.input} type="text" placeholder={"E-mail"} {...register
                        ("email",
                            {
                                required: true,
                                maxLength: 20,
                                pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                            }
                        )} />
                        {errors.email?.type === 'required' &&
                            <div className={styles.error} role="alert">Need to write some text</div>}
                        {errors.email?.type === 'maxLength' &&
                            <div className={styles.error} role="alert">Max length 20</div>}
                        {errors.email?.type === 'pattern' &&
                            <div className={styles.error} role="alert">Please enter valid email</div>}

                    </div>
                    <div>
                        <input className={styles.input} type={"password"} {...register("password",
                            {
                                required: true,
                                // pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                            }
                        )} />
                        {errors.password?.type === 'required' &&
                            <div className={styles.error} role={"alert"}>Need to write some text</div>}
                        {/*{errors.password?.type === 'pattern' && <div className={styles.error} role="alert">Please enter valid password</div>}*/}
                    </div>
                    <div>
                        <input className={styles.input} type="checkbox" id={"rememberMe"} {...register("rememberMe")} />
                        <label className={styles.rememberMe} htmlFor="rememberMe">Remember Me</label>
                    </div>
                    <div>
                        <div>
                            {props.captcha && <img src={props.captcha} alt=""/>}
                        </div>
                        {props.captcha &&
                            <input className={styles.input} type={"text"} {...register("captcha",
                                {
                                    required: true
                                }
                            )} />}
                        {errors.captcha?.type === 'required' &&
                            <div className={styles.error} role={"alert"}>Need to write some text</div>}
                    </div>
                    <button className={styles.formButton}>Login</button>
                </form>
            </div>
    );
}

const mapStateToProps = (state:AppStateType):MapStateToPropsType => {
    return {
        captcha: state.auth.captcha,
        messages: state.auth.messages,
        isAuth: state.auth.isAuth,
    }
}

export default
    connect(mapStateToProps, {SetAuthData: actions.SetAuthData,Login,Logout})
(LoginForm);