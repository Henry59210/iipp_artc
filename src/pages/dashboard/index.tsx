import {getLayout} from "@/components/Layout";
import {NextPageWithLayout} from "../_app";
import styles from "@/styles/dashboard.module.css"
import {Inventory} from "@/components/Dashboard/Inventory";
import {ConfirmedOrder} from "@/components/Dashboard/ConfirmedOrder";


const Dashboard: NextPageWithLayout = () => {
    return (
        <div className={styles.container}>
            <ConfirmedOrder/>
            <Inventory type={'raw'}/>
            <Inventory type={'product'}/>
        </div>
    )
}

export default Dashboard

Dashboard.getLayout = getLayout
