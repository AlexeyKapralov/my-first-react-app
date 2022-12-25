import styles from "./AboutProfileForm.module.scss"
import {SubmitHandler, useForm} from "react-hook-form";
import settingsIcon from "../../../../assets/Settings.png"
import React, {useState} from "react";
import {tGetProfile, tProfileData} from "../../../../api/profile-api";

type FormData = tGetProfile

type Props = {
    post: tGetProfile | undefined
    propsUserId: number,
    setNewProfileData: (arg0: tGetProfile) => void
}

export const AboutProfileForm:React.FC<Props> = ({post, propsUserId,setNewProfileData}) => {
    const [profileEditMode, setProfileEditMode] = useState(false)
    const {register, handleSubmit, formState: { errors }} = useForm<FormData>()
    const onSubmit:SubmitHandler<FormData> = (data) => {
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



            {post?.userId === propsUserId?.toString() &&
                <button className={styles.changeProfileBtn} onClick={toggleProfileEditMode}><img width={"20px"} src={settingsIcon} alt="settings"/></button>
            }

            {!profileEditMode &&
                <div>
                    <div className={styles.container}>
                        <div>
                            <div className={styles.fieldTitle}>Full name</div>
                            <div className={styles.fieldContent}>{post?.fullName || "missing"}</div>
                        </div>
                        <div>
                            <div className={styles.fieldTitle}>About me</div>
                            <div className={styles.fieldContent}>{post?.aboutMe || "missing"}</div>
                        </div>
                        <div>
                            <div className={styles.fieldTitle}>Looking for a job</div>
                            {post?.lookingForAJob && <div className={styles.fieldContent}>Yes</div>}
                            {!post?.lookingForAJob && <div className={styles.fieldContent}>No</div>}
                        </div>
                        <div>
                            <div className={styles.fieldTitle}>Looking for a job description</div>
                            <div className={styles.fieldContent}>{post?.lookingForAJobDescription || "missing"}</div>
                        </div>
                    </div>
                    <div className={styles.contacts}>Contacts</div>
                    <div className={styles.container}>

                        {
                            Object.keys(post?.contacts || {}).map((i) => {
                                return <div key={i}>
                                    <div className={styles.fieldTitle}>{i}</div>
                                    { post?.contacts[i as keyof typeof post.contacts] &&
                                        <a target="_blank"
                                           href={post?.contacts[i as keyof typeof post.contacts]}
                                           className={styles.fieldContent}>{post?.contacts[i as keyof typeof post.contacts]}</a>
                                    }
                                    { !post?.contacts[i as keyof typeof post.contacts] &&
                                        <div className={styles.fieldContentMissing}>missing</div>
                                    }
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
                        <input className={styles.fieldContentInput} defaultValue={post?.fullName} placeholder="Enter your full name" {...register("fullName", {required:true} )}  />
                        {errors.fullName?.type === 'required' && <div style={{color:'red'}} role="alert">Need to write some text</div>}
                    </div>
                    <div>
                        <div className={styles.fieldTitle}>About me</div>
                        <input className={styles.fieldContentInput} defaultValue={post?.aboutMe}  placeholder="Enter info about yourself" {...register("aboutMe", {required:true} )}  />
                        {errors.aboutMe?.type === 'required' && <div style={{color:'red'}} role="alert">Need to write some text</div>}
                    </div>
                    <div>
                        <div className={styles.fieldTitle}>Looking For A Job</div>
                        <input className={styles.fieldContentInput} defaultValue={String(post?.lookingForAJob)}  type={"checkbox"} placeholder="Are you looking for a job?" {...register("lookingForAJob" )}  />
                    </div>
                    <div>
                        <div className={styles.fieldTitle}>Looking For A Job Description</div>
                        <input className={styles.fieldContentInput} defaultValue={post?.lookingForAJobDescription} placeholder="Looking for a job description" {...register("lookingForAJobDescription", {required:true} )}  />
                        {errors.lookingForAJobDescription?.type === 'required' && <div style={{color:'red'}} role="alert">Need to write some text</div>}
                    </div>
                </div>
                    <div className={styles.contacts}>Contacts</div>
                    <div className={styles.container}>
                        <div>
                            <div className={styles.fieldTitle}>facebook</div>
                            <input className={styles.fieldContentInput} placeholder={`Enter your facebook`} {...register("contacts.facebook",
                                { pattern: {
                                        value: /^(https:|http:|www\.)\/\/\S*\.\S+/gm,
                                        message: "Enter correctly URL"
                                    }
                                })} defaultValue={post?.contacts.facebook}/>

                            {errors.contacts && <div style={{color:"red"}}>{errors.contacts?.facebook?.message}</div>}
                        </div>
                        <div>
                            <div className={styles.fieldTitle}>website</div>
                            <input className={styles.fieldContentInput} placeholder={`Enter your website`} {...register("contacts.website",
                                { pattern: {
                                        value: /^(https:|http:|www\.)\/\/\S*\.\S+/gm,
                                        message: "Enter correctly URL"
                                    }
                                })} defaultValue={post?.contacts.website}/>
                            {errors.contacts && <div style={{color:"red"}}>{errors.contacts?.website?.message}</div>}
                        </div>
                        <div>
                            <div className={styles.fieldTitle}>Vk</div>
                            <input className={styles.fieldContentInput} placeholder={`Enter your vk`} {...register("contacts.vk",
                                { pattern: {
                                        value: /^(https:|http:|www\.)\/\/\S*\.\S+/gm,
                                        message: "Enter correctly URL"
                                    }
                                })}defaultValue={post?.contacts.vk}/>
                            {errors.contacts && <div style={{color:"red"}}>{errors.contacts?.vk?.message}</div>}
                        </div>
                        <div>
                            <div className={styles.fieldTitle}>twitter</div>
                            <input className={styles.fieldContentInput} placeholder={`Enter your twitter`} {...register("contacts.twitter",
                                { pattern: {
                                        value: /^(https:|http:|www\.)\/\/\S*\.\S+/gm,
                                        message: "Enter correctly URL"
                                    }
                                })}defaultValue={post?.contacts.twitter}/>
                            {errors.contacts && <div style={{color:"red"}}>{errors.contacts?.twitter?.message}</div>}
                        </div>
                        <div>
                            <div className={styles.fieldTitle}>instagram</div>
                            <input className={styles.fieldContentInput} placeholder={`Enter your instagram`} {...register("contacts.instagram",
                                { pattern: {
                                        value: /^(https:|http:|www\.)\/\/\S*\.\S+/gm,
                                        message: "Enter correctly URL"
                                    }
                                })}defaultValue={post?.contacts.instagram}/>
                            {errors.contacts && <div style={{color:"red"}}>{errors.contacts?.instagram?.message}</div>}
                        </div>
                        <div>
                            <div className={styles.fieldTitle}>youtube</div>
                            <input className={styles.fieldContentInput} placeholder={`Enter your youtube`} {...register("contacts.youtube",
                                { pattern: {
                                        value: /^(https:|http:|www\.)\/\/\S*\.\S+/gm,
                                        message: "Enter correctly URL"
                                    }
                                })}defaultValue={post?.contacts.youtube}/>
                            {errors.contacts && <div style={{color:"red"}}>{errors.contacts?.youtube?.message}</div>}
                        </div>
                        <div>
                            <div className={styles.fieldTitle}>Github</div>
                            <input className={styles.fieldContentInput} placeholder={`Enter your github`} {...register("contacts.github",
                                { pattern: {
                                        value: /^(https:|http:|www\.)\/\/\S*\.\S+/gm,
                                        message: "Enter correctly URL"
                                    }
                                })}defaultValue={post?.contacts.github}/>
                            {errors.contacts && <div style={{color:"red"}}>{errors.contacts?.github?.message}</div>}
                        </div>
                        <div>
                            <div className={styles.fieldTitle}>mainLink</div>
                            <input className={styles.fieldContentInput} placeholder={`Enter your mainLink`} {...register("contacts.mainLink",
                                { pattern: {
                                        value: /^(https:|http:|www\.)\/\/\S*\.\S+/gm,
                                        message: "Enter correctly URL"
                                    }
                                })}defaultValue={post?.contacts.mainLink}/>
                            {errors.contacts && <div style={{color:"red"}}>{errors.contacts?.mainLink?.message}</div>}
                        </div>
                    </div>
                <button className={styles.formButton}>Change info</button>
            </form>}

        </div>
    )
}
