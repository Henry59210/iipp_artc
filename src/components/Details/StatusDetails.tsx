import styles from "./styles.module.css"
import {Timeline} from "antd";
import {ClockCircleOutlined} from "@ant-design/icons";
import {useAppSelector} from "@/hooks";
import {selectRole} from "@/features/user/userSlice";

export const StatusDetails = () => {

    return (
        <div className={styles.status_container}>
            <div className={styles.status_container_status}>

            </div>
            <div className={styles.status_container_info}>

            </div>
            <div className={styles.status_container_composition}>

            </div>
        </div>
    )
}
