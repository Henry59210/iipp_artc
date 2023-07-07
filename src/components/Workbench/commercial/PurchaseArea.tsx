import styles from "@/components/Workbench/commercial/styles.module.css"
import {OrderFilter} from "@/components/Order/OrderFilter";
import React, {useEffect, useRef, useState} from "react";
import {OrderForm} from "@/components/Global/OrderForm";
import {InventoryDetails} from "@/components/Details/InventoryDetails";
import {Modal, Spin} from "antd";
import {getOrdersForCommercial, OrderInfo, OrderRequest} from "@/apis/order";

// const data: OrderInfo[] = [
//     {
//         id: '1',
//         customerId: 'Singapore',
//         orderDate: '2020-3-4',
//         expectedTime: '2020-3-6',
//         status: 'wait for raw',
//         productList: [{id: '2222', productName: 'MIX CHOC DRINK KR 560G 16/CS', quantity: 4000}]
//     }, {
//         id: '2',
//         customerId: 'Singapore',
//         orderDate: '2020-3-4',
//         expectedTime: '2020-3-6',
//         status: 'wait for raw',
//         productList: [{id: '2222', productName: 'MIX CHOC DRINK KR 560G 16/CS', quantity: 4000}]
//     }, {
//         id: '3',
//         customerId: 'Singapore',
//         orderDate: '2020-3-4',
//         expectedTime: '2020-3-6',
//         status: 'wait for raw',
//         productList: [{id: '2222', productName: 'MIX CHOC DRINK KR 560G 16/CS', quantity: 4000}]
//     }, {
//         id: '4',
//         customerId: 'Singapore',
//         orderDate: '2020-3-4',
//         expectedTime: '2020-3-6',
//         status: 'wait for raw',
//         productList: [{id: '2222', productName: 'MIX CHOC DRINK KR 560G 16/CS', quantity: 4000}]
//     }, {
//         id: '5',
//         customerId: 'Singapore',
//         orderDate: '2020-3-4',
//         expectedTime: '2020-3-6',
//         status: 'wait for raw',
//         productList: [{id: '2222', productName: 'MIX CHOC DRINK KR 560G 16/CS', quantity: 4000}]
//     }, {
//         id: '6',
//         customerId: 'Singapore',
//         orderDate: '2020-3-4',
//         expectedTime: '2020-3-6',
//         status: 'wait for raw',
//         productList: [{id: '2222', productName: 'MIX CHOC DRINK KR 560G 16/CS', quantity: 4000}]
//     }, {
//         id: '7',
//         customerId: 'Singapore',
//         orderDate: '2020-3-4',
//         expectedTime: '2020-3-6',
//         status: 'wait for raw',
//         productList: [{id: '2222', productName: 'MIX CHOC DRINK KR 560G 16/CS', quantity: 4000}]
//     }, {
//         id: '8',
//         customerId: 'Singapore',
//         orderDate: '2020-3-4',
//         expectedTime: '2020-3-6',
//         status: 'wait for raw',
//         productList: [{id: '2222', productName: 'MIX CHOC DRINK KR 560G 16/CS', quantity: 4000}]
//     }, {
//         id: '9',
//         customerId: 'Singapore',
//         orderDate: '2020-3-4',
//         expectedTime: '2020-3-6',
//         status: 'wait for raw',
//         productList: [{id: '2222', productName: 'MIX CHOC DRINK KR 560G 16/CS', quantity: 4000}]
//     }, {
//         id: '10',
//         customerId: 'Singapore',
//         orderDate: '2020-3-4',
//         expectedTime: '2020-3-6',
//         status: 'wait for raw',
//         productList: [{id: '2222', productName: 'MIX CHOC DRINK KR 560G 16/CS', quantity: 4000}]
//     }, {
//         id: '11',
//         customerId: 'Singapore',
//         orderDate: '2020-3-4',
//         expectedTime: '2020-3-6',
//         status: 'wait for raw',
//         productList: [{id: '2222', productName: 'MIX CHOC DRINK KR 560G 16/CS', quantity: 4000}]
//     }, {
//         id: '12',
//         customerId: 'Singapore',
//         orderDate: '2020-3-4',
//         expectedTime: '2020-3-6',
//         status: 'wait for raw',
//         productList: [{id: '2222', productName: 'MIX CHOC DRINK KR 560G 16/CS', quantity: 4000}]
//     }, {
//         id: '13',
//         customerId: 'Singapore',
//         orderDate: '2020-3-4',
//         expectedTime: '2020-3-6',
//         status: 'wait for raw',
//         productList: [{id: '2222', productName: 'MIX CHOC DRINK KR 560G 16/CS', quantity: 4000}]
//     }, {
//         id: '14',
//         customerId: 'Singapore',
//         orderDate: '2020-3-4',
//         expectedTime: '2020-3-6',
//         status: 'wait for raw',
//         productList: [{id: '2222', productName: 'MIX CHOC DRINK KR 560G 16/CS', quantity: 4000}]
//     }, {
//         id: '15',
//         customerId: 'Singapore',
//         orderDate: '2020-3-4',
//         expectedTime: '2020-3-6',
//         status: 'wait for raw',
//         productList: [{id: '2222', productName: 'MIX CHOC DRINK KR 560G 16/CS', quantity: 4000}]
//     }, {
//         id: '16',
//         customerId: 'Singapore',
//         orderDate: '2020-3-4',
//         expectedTime: '2020-3-6',
//         status: 'wait for raw',
//         productList: [{id: '2222', productName: 'MIX CHOC DRINK KR 560G 16/CS', quantity: 4000}]
//     }, {
//         id: '17',
//         customerId: 'Singapore',
//         orderDate: '2020-3-4',
//         expectedTime: '2020-3-6',
//         status: 'wait for raw',
//         productList: [{id: '2222', productName: 'MIX CHOC DRINK KR 560G 16/CS', quantity: 4000}]
//     }, {
//         id: '18',
//         customerId: 'Singapore',
//         orderDate: '2020-3-4',
//         expectedTime: '2020-3-6',
//         status: 'wait for raw',
//         productList: [{id: '2222', productName: 'MIX CHOC DRINK KR 560G 16/CS', quantity: 4000}]
//     }, {
//         id: '19',
//         customerId: 'Singapore',
//         orderDate: '2020-3-4',
//         expectedTime: '2020-3-6',
//         status: 'wait for raw',
//         productList: [{id: '2222', productName: 'MIX CHOC DRINK KR 560G 16/CS', quantity: 4000}]
//     }, {
//         id: '20',
//         customerId: 'Singapore',
//         orderDate: '2020-3-4',
//         expectedTime: '2020-3-6',
//         status: 'wait for raw',
//         productList: [{id: '2222', productName: 'MIX CHOC DRINK KR 560G 16/CS', quantity: 4000}]
//     }, {
//         id: '21',
//         customerId: 'Singapore',
//         orderDate: '2020-3-4',
//         expectedTime: '2020-3-6',
//         status: 'wait for raw',
//         productList: [{id: '2222', productName: 'MIX CHOC DRINK KR 560G 16/CS', quantity: 4000}]
//     }, {
//         id: '22',
//         customerId: 'Singapore',
//         orderDate: '2020-3-4',
//         expectedTime: '2020-3-6',
//         status: 'wait for raw',
//         productList: [{id: '2222', productName: 'MIX CHOC DRINK KR 560G 16/CS', quantity: 4000}]
//     }, {
//         id: '23',
//         customerId: 'Singapore',
//         orderDate: '2020-3-4',
//         expectedTime: '2020-3-6',
//         status: 'wait for raw',
//         productList: [{id: '2222', productName: 'MIX CHOC DRINK KR 560G 16/CS', quantity: 4000}]
//     }, {
//         id: '24',
//         customerId: 'Singapore',
//         orderDate: '2020-3-4',
//         expectedTime: '2020-3-6',
//         status: 'wait for raw',
//         productList: [{id: '2222', productName: 'MIX CHOC DRINK KR 560G 16/CS', quantity: 4000}]
//     }, {
//         id: '25',
//         customerId: 'Singapore',
//         orderDate: '2020-3-4',
//         expectedTime: '2020-3-6',
//         status: 'wait for raw',
//         productList: [{id: '2222', productName: 'MIX CHOC DRINK KR 560G 16/CS', quantity: 4000}]
//     }, {
//         id: '26',
//         customerId: 'Singapore',
//         orderDate: '2020-3-4',
//         expectedTime: '2020-3-6',
//         status: 'wait for raw',
//         productList: [{id: '2222', productName: 'MIX CHOC DRINK KR 560G 16/CS', quantity: 4000}]
//     },
// ];

export const PurchaseArea = () => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState<OrderInfo[]>([])
    const [open, setOpen] = useState(false);
    const [currentId, setCurrentId] = useState('');

    const getFilterData = async (filterData: OrderRequest) => {
        setLoading(true)
        const res = await getOrdersForCommercial(filterData, {limit: -1, offset: 1})
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
                    <OrderFilter type={'employee'} getFilterData={getFilterData} status={'Pending RM'} combine={false}/>
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
