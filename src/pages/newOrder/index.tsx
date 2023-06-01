import {NextPageWithLayout} from "@/pages/_app";
import styles from "@/styles/neworder.module.css";
import {UnconfirmedOrder} from "@/components/Neworder/UnconfirmedOrder";
import {Inventory} from "@/components/Neworder/Inventory";
import {getLayout} from "@/components/Layout";

const NewOrder: NextPageWithLayout = () => {
    return (
        <div className={styles.container}>
            <UnconfirmedOrder/>
            <Inventory type={'raw'}/>
            <Inventory type={'product'}/>
        </div>
    )
}

export default NewOrder

NewOrder.getLayout = getLayout
