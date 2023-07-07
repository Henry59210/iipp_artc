import {NextPageWithLayout} from "@/pages/_app";
import styles from "@/styles/neworder.module.css";
import {UnconfirmedOrder} from "@/components/Neworder/UnconfirmedOrder";
import {Inventory} from "@/components/Neworder/Inventory";
import {getLayout} from "@/components/Layout";
import {useAppSelector} from "@/hooks";
import {
    selectUnconfirmedOrderCurrent,
    setLastUnconfirmedOrderTab,
    unConfirmedOrderTabs
} from "@/features/pageMemo/pageSlice";
import {useDispatch} from "react-redux";
import {Menu, MenuProps} from "antd";
import React from "react";

const items: MenuProps['items'] = [
    {
        label: 'Order',
        key: 'order',
    },
    {
        label: 'Forecast',
        key: 'forecast',
    }
];

const NewOrder: NextPageWithLayout = () => {
    const currentTab_unconfirmed = useAppSelector(selectUnconfirmedOrderCurrent)
    const dispatch = useDispatch()
    const selectTab: MenuProps['onClick'] = (e) => {
        dispatch(setLastUnconfirmedOrderTab(e.key as unConfirmedOrderTabs))
    };
    return (
        <div className={styles.container}>
            <div className={styles.unconfirmed_order_container}>
                <Menu className={styles.unconfirmed_order_navbar}  onClick={selectTab} selectedKeys={[currentTab_unconfirmed]} mode="horizontal"
                      items={items}/>
                {
                    currentTab_unconfirmed === 'order' ? <UnconfirmedOrder type={"order"}/> : <UnconfirmedOrder type={"forecast"}/>
                }
            </div>

            <div className={styles.inventory_container}>
                <Inventory type={'raw'}/>
            </div>

            <div className={styles.inventory_container}>
                <Inventory type={'product'}/>
            </div>
        </div>
    )
}

export default NewOrder

NewOrder.getLayout = getLayout
