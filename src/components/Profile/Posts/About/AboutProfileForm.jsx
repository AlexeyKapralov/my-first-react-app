import styles from "./AboutProfileForm.module.scss"
import { useForm } from "react-hook-form";
import settingsIcon from "../../../../assets/Settings.png"
import React, {useState} from "react";

export const AboutProfileForm = ({post, userId, propsUserId,setNewProfileData}) => {
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
                <button className={styles.changeProfileBtn} onClick={toggleProfileEditMode}><img width={"20px"} src={settingsIcon} alt="settings"/></button>
            }

            {!profileEditMode &&
                <div>
                    <div className={styles.container}>
                        <div>
                            <div className={styles.fieldTitle}>Full name</div>
                            <div className={styles.fieldContent}>{post.fullName || "missing"}</div>
                        </div>
                        <div>
                            <div className={styles.fieldTitle}>About me</div>
                            <div className={styles.fieldContent}>{post.aboutMe || "missing"}</div>
                        </div>
                        <div>
                            <div className={styles.fieldTitle}>Looking for a job</div>
                            {post.lookingForAJob && <div className={styles.fieldContent}>Yes</div>}
                            {!post.lookingForAJob && <div className={styles.fieldContent}>No</div>}
                        </div>
                        <div>
                            <div className={styles.fieldTitle}>Looking for a job description</div>
                            <div className={styles.fieldContent}>{post.lookingForAJobDescription || "missing"}</div>
                        </div>
                    </div>
                    <div className={styles.contacts}>Contacts</div>
                    <div className={styles.container}>

                        {
                            Object.keys(post.contacts || {}).map(i => {
                                return <div key={i}>
                                    <div className={styles.fieldTitle}>{i}</div>
                                    <div className={styles.fieldContent}>{post.contacts[i] || "unknown"}</div>
                                </div>
                            })
                        }
                    </div>
                </div>
            }

            {profileEditMode && <form  onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.container}>

                    <div>
                        <div className={styles.fieldTitle}>Full name</div>
                        <input className={styles.fieldContentInput} defaultValue={post.fullName} placeholder="Enter your full name" {...register("fullName", {required:true} )}  />
                        {errors.fullName?.type === 'required' && <div style={{color:'red'}} role="alert">Need to write some text</div>}
                    </div>
                    <div>
                        <div className={styles.fieldTitle}>About me</div>
                        <input className={styles.fieldContentInput} defaultValue={post.aboutMe}  placeholder="Enter info about yourself" {...register("aboutMe", {required:true} )}  />
                        {errors.aboutMe?.type === 'required' && <div style={{color:'red'}} role="alert">Need to write some text</div>}
                    </div>
                    <div>
                        <div className={styles.fieldTitle}>Looking For A Job</div>
                        <input className={styles.fieldContentInput} defaultValue={post.lookingForAJob}  type={"checkbox"} placeholder="Are you looking for a job?" {...register("lookingForAJob" )}  />
                    </div>
                    <div>
                        <div className={styles.fieldTitle}>Looking For A Job Description</div>
                        <input className={styles.fieldContentInput} defaultValue={post.lookingForAJobDescription} placeholder="Looking for a job description" {...register("lookingForAJobDescription", {required:true} )}  />
                        {errors.lookingForAJobDescription?.type === 'required' && <div style={{color:'red'}} role="alert">Need to write some text</div>}
                    </div>
                </div>
                    <div className={styles.contacts}>Contacts</div>
                    <div className={styles.container}>

                        {
                            Object.keys(post.contacts || {}).map(i => {
                                return <div key={i}>
                                    <div className={styles.fieldTitle}>{i}</div>
                                    <input className={styles.fieldContentInput} placeholder={`Enter your ${i}`} {...register("contacts."+i,
                                { pattern: {
                                            value: /^(https:|http:|www\.)\/\/\S*\.\S+/gm,
                                            message: "Enter correctly URL"
                                        }
                                    })} defaultValue={post.contacts[i]}/>
                                    {errors.contacts && <div style={{color:"red"}}>{errors.contacts[i]?.message}</div>}
                                </div>
                            })


                        }
                    </div>
                <button className={styles.formButton}>Change info</button>
            </form>}

        </div>
    )
}
