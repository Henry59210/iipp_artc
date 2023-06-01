import {getLayout} from "@/components/Layout";
import {NextPageWithLayout} from "../_app";
import styles from "@/styles/dashboard.module.css"
import {Inventory} from "@/components/Neworder/Inventory";


const Dashboard: NextPageWithLayout = () => {
    return (
        <div className={styles.container}>
            dashboard
        </div>
    )
}

export default Dashboard

Dashboard.getLayout = getLayout
