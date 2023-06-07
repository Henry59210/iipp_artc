import {NextPageWithLayout} from "../_app";
import {useRouter} from "next/router";
import {getLayout} from "@/components/Layout";
import {OrderForm} from "@/components/Global/OrderForm";
import styles from "@/styles/order.module.css"

const Order: NextPageWithLayout = () => {
    const router = useRouter()
    return (
        <div className={styles.container}>
            <OrderForm role={'commercial'} type={'order'}></OrderForm>
        </div>
    )
}

export default Order

Order.getLayout = getLayout
