import type { NextPage } from 'next'
import styles from '../styles/Login.module.css'

const LoginPage: NextPage = () => {

    return (
        <>
            <div className={styles.videoContainer}>
                <video className={styles.video} autoPlay loop muted>
                    <source src="/loginBackground.mp4" type="video/mp4" />
                </video>
            </div>
        </>
    )
}

export default LoginPage;
