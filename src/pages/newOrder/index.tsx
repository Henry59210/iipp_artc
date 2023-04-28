import {NextPageWithLayout} from "@/pages/_app";
import styles from "@/styles/dashboard.module.css";
import {ConfirmedOrder} from "@/components/Dashboard/ConfirmedOrder";
import {Inventory} from "@/components/Dashboard/Inventory";
import {getLayout} from "@/components/Layout";

const NewOrder: NextPageWithLayout = () => {
    return (
        <div className={styles.container}>
           new order
        </div>
    )
}

export default NewOrder

NewOrder.getLayout = getLayout
