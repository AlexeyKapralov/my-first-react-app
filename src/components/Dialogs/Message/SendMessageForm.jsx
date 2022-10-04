import s from "../Dialogs.module.css";
import React from "react";
import {useForm} from "react-hook-form";

export const SendMessageForm = (props) => {

    const {register, handleSubmit, reset, formState:{errors}}  = useForm();
    const onSubmit = data => {
        props.sendNewMessage(data.message)
        reset()
    }

    return(
        <form className={s.container} onSubmit={handleSubmit(onSubmit)}>
            <input type="text" placeholder="Write your message!!!"  {...register("message",
                {
                    required:true,
                    maxLength: 170
                }
            )}/>
            {errors.message?.type === 'required' && <div style={{color:'red'}} role="alert">Need to write some text</div>}
            {errors.message?.type === 'maxLength' && <div style={{color:'red'}} role="alert">Max length 170</div>}

            <button className={s.button}>
                <img src="https://cdn-icons-png.flaticon.com/512/3526/3526788.png" alt="..."/>
            </button>
        </form>
    )
}