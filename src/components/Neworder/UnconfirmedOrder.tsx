import styles from "@/components/Neworder/styles.module.css";
import {Button, Menu, MenuProps, message, Modal, Popconfirm, Popover, Spin, Typography} from "antd";
import React, {useEffect, useRef, useState} from "react";
import {
    confirmOrder,
    getOrderInventoryDetail,
    getOrdersForCommercial,
    OrderDetail,
    OrderInfo,
    OrderRequest
} from "@/apis/order";
import {dateConvert, deepEqual} from "@/utilities/usefulTools";
import {ItemText} from "@/components/Global/ItemText";
import {InventoryDetails} from "@/components/Details/InventoryDetails";
import {code} from "@antv/g2/lib/geometry/label/layout/worker/hide-overlap";



// const testData: Array<OrderInfo> = [
//     {
//         customerId: "Singapore",
//         expectedTime: "2023-04-26T08:29:22.081Z",
//         id: "1124434426524",
//         orderDate: "2023-04-26T08:29:22.081Z",
//         productList: [
//             {
//                 id: "string",
//                 productName: "MIX CHOC DRINK KR 560G 16/CS",
//                 quantity: 1000
//             },
//             {
//                 id: "string",
//                 productName: "MIX CHOC DRINK KR 560G 16/CS",
//                 quantity: 1000
//             },
//             {
//                 id: "string",
//                 productName: "MIX CHOC DRINK KR 560G 16/CS",
//                 quantity: 1000
//             }
//         ],
//         status: "unconfirmed"
//     },
//     {
//         customerId: "China",
//         expectedTime: "2023-04-26T08:29:22.081Z",
//         id: "1164233426524",
//         orderDate: "2023-04-26T08:29:22.081Z",
//         productList: [
//             {
//                 id: "string",
//                 productName: "MIX CHOC DRINK KR 560G 16/CS",
//                 quantity: 1000
//             },
//             {
//                 id: "string",
//                 productName: "MIX CHOC DRINK KR 560G 16/CS",
//                 quantity: 1000
//             },
//             {
//                 id: "string",
//                 productName: "MIX CHOC DRINK KR 560G 16/CS",
//                 quantity: 1000
//             },
//             {
//                 id: "string",
//                 productName: "MIX CHOC DRINK KR 560G 16/CS",
//                 quantity: 1000
//             },
//             {
//                 id: "string",
//                 productName: "MIX CHOC DRINK KR 560G 16/CS",
//                 quantity: 1000
//             },
//             {
//                 id: "string",
//                 productName: "MIX CHOC DRINK KR 560G 16/CS",
//                 quantity: 1000
//             },
//             {
//                 id: "string",
//                 productName: "MIX CHOC DRINK KR 560G 16/CS",
//                 quantity: 1000
//             },
//             {
//                 id: "string",
//                 productName: "MIX CHOC DRINK KR 560G 16/CS",
//                 quantity: 1000
//             },
//             {
//                 id: "string",
//                 productName: "MIX CHOC DRINK KR 560G 16/CS",
//                 quantity: 1000
//             }, {
//                 id: "string",
//                 productName: "MIX CHOC DRINK KR 560G 16/CS",
//                 quantity: 1000
//             },
//
//             {
//                 id: "string",
//                 productName: "MIX CHOC DRINK KR 560G 16/CS",
//                 quantity: 10
//             },
//             {
//                 id: "string",
//                 productName: "MIX CHOC DRINK KR 560G 16/CS",
//                 quantity: 10
//             },
//             {
//                 id: "string",
//                 productName: "MIX CHOC DRINK KR 560G 16/CS",
//                 quantity: 10
//             },
//             {
//                 id: "string",
//                 productName: "MIX CHOC DRINK KR 560G 16/CS",
//                 quantity: 10
//             },
//         ],
//         status: "unconfirmed"
//     }
//
// ]
const orderHint: string = 'Unconfirmed Order List:'
const forecastHint: string = 'Forecast Order List:'

export const UnconfirmedOrder = ({type}:{type: 'order' | 'forecast'}) => {
    const [orderList, setOrderList] = useState<Array<OrderInfo>>([])
    const [loading, setLoading] = useState(false)
    const newOrderRequest:OrderRequest = {
        customerId: "",
        expectedTimeBegin: "",
        expectedTimeEnd: "",
        orderDateBegin: "",
        orderDateEnd: "",
        orderId: "",
        status: "New Order"
    }
    const getOrdersList = async () => {
        setLoading(true)
        const res = await getOrdersForCommercial(newOrderRequest, {limit: -1, offset: 1})
        if (res.data !== null && res.code === '200') {
            setOrderList(res.data.records)
            setLoading(false)
        }
    }
    useEffect(() => {
        getOrdersList()
    }, [])


    return (
        <Spin spinning={loading}>
            <div className={styles.unconfirmed_order_container}>
                <div className={styles.container_title}>
                    <span>{type === 'order' ? orderHint : forecastHint}</span>
                </div>
                {
                    orderList.map(item => <UnconfirmedOrderItem key={item.id} orderInfo={item} confirmedFunction={getOrdersList}/>)
                }
            </div>
        </Spin>
    )
}

const UnconfirmedOrderItem = ({orderInfo, confirmedFunction}:{orderInfo: OrderInfo, confirmedFunction: ()=>void}) => {
    const [open, setOpen] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const orderDetail = useRef<OrderDetail>({
        orderStatusHistoryList: [],
        customerId: "",
        executableState: "",
        expectedTime: "",
        id: "",
        orderDate: "",
        status: "",
        type: "",
        productDetailList: [],
        demandMaterialList: []
    })
    const sendConfirm = async ()=>{
        const res = await confirmOrder(orderDetail.current)
        if(res.code === '200') {
            setOpen(false)
            await confirmedFunction()
            message.success('Already confirmed')
        } else {
            message.warning('Something error, please try again')
        }
    }
    const checkConfirmStatus = async ()=>{
        const res = await getOrderInventoryDetail(id)
        setIsUpdate(!deepEqual(res.data, orderDetail))
        if(deepEqual(res.data, orderDetail)) {
            await sendConfirm()
        } else {
            orderDetail.current = res.data!
        }
    }
    const openDetail = async ()=>{
        const res = await getOrderInventoryDetail(id)
        if(res.data !== null) {
            orderDetail.current = res.data
            setOpen(true)
        }
    }
    const {customerId, expectedTime, id, orderDate, productList, status} = orderInfo
    return (
        <>
            <div className={styles.unconfirmed_order_item}>
                {/*顶部id*/}
                <div className={styles.unconfirmed_order_item_id}>{'ID: ' + id}</div>
                {/*中间部分+信息+按钮*/}
                <div className={styles.unconfirmed_order_item_content}>
                    <div className={styles.unconfirmed_order_item_content__dep}>{customerId}</div>
                    <div className={styles.unconfirmed_order_item_content__info}>
                        <Popover placement="right"
                                 content={<div className={styles.overview_content}>{productList.map(item => <ItemText
                                     key={item.id}
                                     title={item.productName} value={item.quantity}/>)}</div>}>
                            <div className={styles.overview}>overview</div>
                        </Popover>
                        <div className={styles.order_items_container}>
                            {productList.map(item => <ItemText key={item.id} title={item.productName} value={item.quantity}/>)}
                        </div>
                    </div>
                    <div className={styles.unconfirmed_order_item_content__btn}>
                        <Button type="link" onClick={openDetail}>Detail</Button>
                    </div>
                </div>
                {/*底部时间*/}
                <div className={styles.unconfirmed_order_item_time}>
                    <span>{dateConvert(orderDate)}</span>
                </div>
            </div>
            <Modal
                title="Inventory Details"
                centered
                open={open}
                onCancel={()=>setOpen(false)}
                footer={[
                    <Popconfirm
                    title="Warning"
                    key="confirm"
                    description="The inventory have already updated, do you want to check again?"
                    disabled={!isUpdate}
                    onConfirm={async ()=>{
                        await sendConfirm()
                    }}
                    okText="Confirm anyway"
                    cancelText="Check again"
                >
                    <Button type={"primary"} onClick={checkConfirmStatus}>Confirm</Button>
                </Popconfirm>,
                    <Button key="cancel" onClick={()=>setOpen(false)}>Cancel</Button>
                ]}
                width={1000}
            >
                <InventoryDetails orderDetail={orderDetail.current} />
            </Modal>
        </>

    )
}
