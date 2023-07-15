import {NextPageWithLayout} from "../_app";
import {useRouter} from "next/router";
import {getLayout} from "@/components/Layout";
import {OrderForm} from "@/components/Global/OrderForm";
import styles from "@/styles/order.module.css"
import React, {useEffect, useLayoutEffect, useRef, useState} from "react";
import {Modal, Pagination, Spin} from "antd";
import {OrderFilter} from "@/components/Order/OrderFilter";
import {Dayjs} from "dayjs";
import {getOrdersForCommercial, OrderInfo, OrderRequest} from "@/apis/order";
import {InventoryDetails} from "@/components/Details/InventoryDetails";
import {StatusDetails} from "@/components/Details/StatusDetails";
import {useAppSelector} from "@/hooks";
import {selectRole} from "@/features/user/userSlice";

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

const Order: NextPageWithLayout = () => {
    const role = useAppSelector(selectRole)
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState<OrderInfo[]>([])
    const [open, setOpen] = useState(false);
    const currentPage = useRef(1)
    const currentOrderStatusDetails = useRef<OrderInfo>({
        customerId: "",
        expectedTime: "",
        id: "",
        orderDate: "",
        orderStatusHistoryList: [],
        productList: [],
        status: ""
    })
    const [limit, setLimit] = useState(10)
    const [total, setTotal] = useState(0)
    const filterRef = useRef<HTMLDivElement>(null);
    const [filterData, setFilterData] = useState<OrderRequest>({
        customerId: "",
        expectedTimeBegin: "",
        expectedTimeEnd: "",
        orderDateBegin: "",
        orderDateEnd: "",
        orderId: "",
        status: ""
    })

    const getFilterData = async (filterData: OrderRequest) => {
        setFilterData(filterData)
        setLoading(true)
        const res = await getOrdersForCommercial(filterData, role, {limit: limit, offset: currentPage.current})
        if (res.data !== null) {
            setTotal(res.data.total)
            setData(res.data.records)
            setLoading(false)
        }
    }
    const changePage = async (page: number) => {
        currentPage.current = page
        await getFilterData(filterData)
    }
    const changeSize = async (_: any, size: number) => {
        setLimit(size)
        await getFilterData(filterData)
    }
    const openModal = (record: OrderInfo, item: string) => {
        currentOrderStatusDetails.current = record
        setOpen(true)
    }

    return (
        <div className={styles.container}>
            <div ref={filterRef}>
                <OrderFilter type={role === 'customer' ? 'customer' : 'employee'} getFilterData={getFilterData} combine={false}/>
            </div>
            <div className={styles.form_container}>
                <Spin spinning={loading}>
                    <OrderForm
                        data={data}
                        checkbox={false}
                        combine={false}
                        node={['Detail']}
                        action={openModal}
                    />
                </Spin>
            </div>
            <div className={styles.pagination_container}>
                <Pagination
                    current={currentPage.current}
                    onShowSizeChange={changeSize}
                    onChange={changePage}
                    total={total}/>
            </div>
            <Modal
                title="Inventory Details"
                centered
                open={open}
                destroyOnClose={true}
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
                width={1000}
            >
                <StatusDetails orderInfo={currentOrderStatusDetails.current}/>
            </Modal>
        </div>
    )
}

export default Order

Order.getLayout = getLayout
