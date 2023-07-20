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

const Order: NextPageWithLayout = () => {
    const role = useAppSelector(selectRole)
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState<OrderInfo[]>([])
    const [open, setOpen] = useState(false);
    const currentPage = useRef(1)
    const currentOrderStatusDetails = useRef<OrderInfo>({
        customerId: "",
        customerDept: "",
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
        customerDept: "",
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
