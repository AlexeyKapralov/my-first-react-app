import preloader from "../../../assets/Preloader.svg"
import styles from './Preloader.module.scss'

export const Preloader = () => {
    return (
        <div className={styles.container}>
            <img src={preloader}/>
        </div>
    )
}