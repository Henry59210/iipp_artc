import styles from "@/components/Workbench/commercial/styles.module.css"
import {OrderFilter} from "@/components/Order/OrderFilter";
import React, {useEffect, useRef, useState} from "react";
import {OrderForm} from "@/components/Global/OrderForm";
import {InventoryDetails} from "@/components/Details/InventoryDetails";
import {Modal, Spin} from "antd";
import {getOrdersForCommercial, OrderInfo, OrderRequest} from "@/apis/order";
import {useAppSelector} from "@/hooks";
import {selectRole} from "@/features/user/userSlice";

export const PurchaseArea = () => {
    const role = useAppSelector(selectRole)
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState<OrderInfo[]>([])
    const [open, setOpen] = useState(false);
    const [currentId, setCurrentId] = useState('');

    const getFilterData = async (filterData: OrderRequest) => {
        setLoading(true)
        const res = await getOrdersForCommercial(filterData, role, {limit: -1, offset: 1})
        if (res.data !== null) {
            setData(res.data.records)
            setLoading(false)
        }
    }
    const openModal = ({id}: { id: string }) => {
        setOpen(true)
        setCurrentId(id)
    }
    return (
        <Spin spinning={loading}>
            <div className={styles.purchase_container}>
                <div className={styles.purchase_container_filter}>
                    <OrderFilter type={'employee'} getFilterData={getFilterData} status={'Pending RM Purchase'} combine={false}/>
                </div>
                <div className={styles.purchase_container_form}>
                    <OrderForm data={data} checkbox={false} node={['handle']} action={openModal} combine={false}/>
                </div>
                <Modal
                    title="Inventory Details"
                    centered
                    open={open}
                    okText={'Next'}
                    cancelText={'Later'}
                    onOk={() => setOpen(false)}
                    onCancel={() => setOpen(false)}
                    width={1000}
                >
                    <InventoryDetails id={currentId}/>
                </Modal>
            </div>
        </Spin>
    )
}
