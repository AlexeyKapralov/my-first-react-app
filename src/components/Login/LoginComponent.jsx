import React from "react";
import { useForm } from "react-hook-form";
import {connect} from "react-redux";
import {SetAuthData, Login} from "../../redux/auth-reducer";

export const LoginFunction = (props) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const onSubmit = data => {
        props.Login(data)
        reset()
    }

    return (

        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <input {...register("email")} />
            </div>
            <div>
                <input {...register("password")} />
            </div>
            <div>
                <input type="checkbox" id={"rememberMe"} {...register("rememberMe")} />
                <label htmlFor="rememberMe">Remember Me</label>
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

export const LoginComponent = connect(mapStateToProps, {SetAuthData,Login})(LoginFunction);