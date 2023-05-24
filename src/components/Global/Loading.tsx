import {Spin} from "antd";
import styles from "./styles.module.css"

export const Loading = () => {
    return (
        <div className={styles.mask_layer}>
           <Spin className={styles.spin} size={"large"}/>
        </div>)
}
