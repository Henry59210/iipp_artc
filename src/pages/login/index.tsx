import type { NextPage } from 'next'
import styles from '../../components/Login/styles.module.css'
import LoginBox from "../../components/Login/login";

const LoginPage: NextPage = () => {

    return (
        <>
            <div className={styles.loginContainer}>
                <video className={styles.video} autoPlay loop muted>
                    <source src="/loginBackground.mp4" type="video/mp4" />
                </video>
                <LoginBox/>
            </div>
        </>
    )
}

export default LoginPage;
