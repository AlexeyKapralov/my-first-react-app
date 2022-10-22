import styles from "./AboutProfile.module.scss"
import { useForm } from "react-hook-form";
import s from "../../Profile.module.scss";
import React, {useState} from "react";

export const AboutProfile = ({post, userId, propsUserId,setNewProfileData}) => {
    const [profileEditMode, setProfileEditMode] = useState(false)
    const {register, handleSubmit, formState: { errors }} = useForm()
    const onSubmit = data => {
        setNewProfileData(data)
        setProfileEditMode(false)
    }


    const toggleProfileEditMode = () => {
        if (profileEditMode) {
            setProfileEditMode(false)
        } else setProfileEditMode(true)
    }

    return (
        <div className={styles.wrapper}>



            {userId === propsUserId &&
                <button onClick={toggleProfileEditMode}>Change profile</button>
            }

            {!profileEditMode && <div>
                <div>
                    <div>Full name</div>
                    <div>{post.fullName || "missing"}</div>
                </div>
                <div>
                    <div>About me</div>
                    <div>{post.aboutMe || "missing"}</div>
                </div>
                <div>
                    <div>Looking for a job</div>
                    <div>{post.lookingForAJob && "yes"}</div>
                    <div>{!post.lookingForAJob && "no"}</div>
                </div>
                <div>
                    <div>Looking for a job description</div>
                    <div>{post.lookingForAJobDescription || "missing"}</div>
                </div>
                <div>
                    <div>Contacts</div>
                    <div>

                        {
                            Object.keys(post.contacts || {}).map(i => {
                                return <div key={i}>
                                    <div>{i}</div>
                                    <div>{post.contacts[i] || "unknown"}</div>
                                </div>
                            })
                        }
                    </div>
                </div>
            </div>}

            {profileEditMode && <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <div>Full name</div>
                    <input defaultValue={post.fullName} placeholder="Enter your full name" {...register("fullName", {required:true} )}  />
                    {errors.fullName?.type === 'required' && <div style={{color:'red'}} role="alert">Need to write some text</div>}
                </div>
                <div>
                    <div>About me</div>
                    <input defaultValue={post.aboutMe}  placeholder="Enter info about yourself" {...register("aboutMe", {required:true} )}  />
                    {errors.aboutMe?.type === 'required' && <div style={{color:'red'}} role="alert">Need to write some text</div>}
                </div>
                <div>
                    <div>LookingForAJob</div>
                    <input defaultValue={post.lookingForAJob}  type={"checkbox"} placeholder="Are you looking for a job?" {...register("lookingForAJob" )}  />
                </div>
                <div>
                    <div>Looking For A Job Description</div>
                    <input defaultValue={post.lookingForAJobDescription} placeholder="Looking for a job description" {...register("lookingForAJobDescription", {required:true} )}  />
                    {errors.lookingForAJobDescription?.type === 'required' && <div style={{color:'red'}} role="alert">Need to write some text</div>}
                </div>
                <div>
                    <div>Contacts</div>
                    <div>

                        {
                            Object.keys(post.contacts || {}).map(i => {
                                return <div key={i}>
                                    <div >{i}</div>
                                    <input placeholder={`Enter your ${i}`} {...register("contacts."+i)} defaultValue={post.contacts[i]}/>
                                </div>
                            })
                        }
                    </div>
                </div>
                <button>Change info</button>
            </form>}

        </div>
    )
}