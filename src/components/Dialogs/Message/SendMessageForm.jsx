import s from "../Dialogs.module.css";
import React from "react";
import {useForm} from "react-hook-form";

export const SendMessageForm = (props) => {

    const {register, handleSubmit, reset}  = useForm();
    const onSubmit = data => {
        props.sendNewMessage(data.message)
        reset()
    }

    return(
        <form className={s.container} onSubmit={handleSubmit(onSubmit)}>
            <input type="text" placeholder="Write your message!!!"  {...register("message")}/>

            <button className={s.button}>
                <img src="https://cdn-icons-png.flaticon.com/512/3526/3526788.png" alt="..."/>
            </button>
        </form>
    )
}