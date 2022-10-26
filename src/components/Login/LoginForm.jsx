import React from "react";
import { useForm } from "react-hook-form";
import {connect} from "react-redux";
import {SetAuthData, Login, Logout} from "../../redux/auth-reducer";
import {Navigate} from "react-router-dom";

export const LoginForm = (props) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const onSubmit = data => {
        props.Login(data)
        reset()
    }

    return (
        (props.state.isAuth)
            ? <Navigate to={"/profile"}/>
            : <form onSubmit={handleSubmit(onSubmit)}>

            <div>
                { props.state.messages && <div style={{color:"red"}}>{props.state.messages}</div> }

                <input type="text" placeholder={"E-mail"} {...register
                ("email",
                    {
                        required:true,
                        maxLength: 20,
                        pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    }
                )} />
                {errors.email?.type === 'required' && <div style={{color:'red'}} role="alert">Need to write some text</div>}
                {errors.email?.type === 'maxLength' && <div style={{color:'red'}} role="alert">Max length 20</div>}
                {errors.email?.type === 'pattern' && <div style={{color:'red'}} role="alert">Please enter valid email</div>}

            </div>
            <div>
                <input type={"password"} {...register("password",
                    {
                        required:true,
                        pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                    }
                )} />
                {errors.password?.type === 'required' && <div style={{color:'red'}} role={"alert"}>Need to write some text</div>}
                {errors.password?.type === 'pattern' && <div style={{color:'red'}} role="alert">Please enter valid password</div>}
            </div>
            <div>
                <input type="checkbox" id={"rememberMe"} {...register("rememberMe")} />
                <label htmlFor="rememberMe">Remember Me</label>
            </div>
                <div>
                    <div>
                        {props.state.captcha && <img src={props.state.captcha} alt=""/>}
                    </div>
                    {props.state.captcha &&
                        <input type={"text"} {...register("captcha",
                            {
                                required: true
                            }
                        )} />}
                    {errors.captcha?.type === 'required' &&
                        <div style={{color: 'red'}} role={"alert"}>Need to write some text</div>}
                </div>
            <button>Send</button>
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