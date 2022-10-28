import React from "react";
import { useForm } from "react-hook-form";
import {connect} from "react-redux";
import {SetAuthData, Login, Logout} from "../../redux/auth-reducer";
import {Navigate} from "react-router-dom";
import styles from "./LoginForm.module.scss"

export const LoginForm = (props) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const onSubmit = data => {
        props.Login(data)
        reset()
    }

    return (
        (props.state.isAuth)
            ? <Navigate to={"/profile"}/>
            : <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>

            <div>
                { props.state.messages && <div className={styles.error}>{props.state.messages}</div> }

                <input className={styles.input} type="text" placeholder={"E-mail"} {...register
                ("email",
                    {
                        required:true,
                        maxLength: 20,
                        pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    }
                )} />
                {errors.email?.type === 'required' && <div className={styles.error}role="alert">Need to write some text</div>}
                {errors.email?.type === 'maxLength' && <div className={styles.error} role="alert">Max length 20</div>}
                {errors.email?.type === 'pattern' && <div className={styles.error} role="alert">Please enter valid email</div>}

            </div>
            <div>
                <input className={styles.input} type={"password"} {...register("password",
                    {
                        required:true,
                        // pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                    }
                )} />
                {errors.password?.type === 'required' && <div className={styles.error} role={"alert"}>Need to write some text</div>}
                {/*{errors.password?.type === 'pattern' && <div className={styles.error} role="alert">Please enter valid password</div>}*/}
            </div>
            <div>
                <input className={styles.input} type="checkbox" id={"rememberMe"} {...register("rememberMe")} />
                <label className={styles.rememberMe} htmlFor="rememberMe">Remember Me</label>
            </div>
                <div>
                    <div>
                        {props.state.captcha && <img src={props.state.captcha} alt=""/>}
                    </div>
                    {props.state.captcha &&
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
    );
}

const mapStateToProps = (state) => {
    return {
        state: state.auth,
    }
}

export default
    connect(mapStateToProps, {SetAuthData,Login,Logout})
(LoginForm);