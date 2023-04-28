import styles from "@/components/Dashboard/styles.module.css";
import {Button, Divider, Modal, Typography} from "antd";
import React, {useEffect, useState} from "react";
import {OrderInfo} from "@/apis/order";
import {dateConvert} from "@/utilities/usefulTools";
import {StatusDetails} from "@/components/Details/StatusDetails";

const {Text} = Typography;
const testData: Array<OrderInfo> = [
    {
        customerId: "Singapore",
        expectedTime: "2023-04-26T08:29:22.081Z",
        id: "1124434426524",
        orderDate: "2023-04-26T08:29:22.081Z",
        productList: [
            {
                id: "string",
                productName: "coco1",
                quantity: 10
            },
            {
                id: "string",
                productName: "coco2",
                quantity: 20
            },
            {
                id: "string",
                productName: "coco3",
                quantity: 30
            }
        ],
        status: "confirmed"
    },
    {
        customerId: "China",
        expectedTime: "2023-04-26T08:29:22.081Z",
        id: "1164233426524",
        orderDate: "2023-04-26T08:29:22.081Z",
        productList: [
            {
                id: "string",
                productName: "coco1",
                quantity: 10
            },
            {
                id: "string",
                productName: "coco2",
                quantity: 10
            },
            {
                id: "string",
                productName: "coco3",
                quantity: 10
            }
        ],
        status: "confirmed"
    }

]
export const ConfirmedOrder = () => {
    const [orderList, setOrderList] = useState<Array<OrderInfo>>([])
    useEffect(() => {
        const res = testData
        setOrderList(res)
    }, [])

    return (
        <div className={styles.confirmed_order_container}>
            <div className={styles.container_title}>
                <span>Confirmed Order List: </span>
            </div>
            {
                orderList.map(item => <ConfirmedOrderItem {...item}/>)
            }
        </div>
    )
}

const ConfirmedOrderItem = (orderInfo: OrderInfo) => {
    const [open, setOpen] = useState(false);

    const {customerId, expectedTime, id, orderDate, productList, status} = orderInfo
    // @ts-ignore
    return (
        <>
            <div className={styles.confirmed_order_item}>
            {/*顶部id*/}
            <div className={styles.confirmed_order_item_id}>{'ID: ' + id}</div>
            {/*中间部门+信息+按钮*/}
            <div className={styles.confirmed_order_item_content}>
                <div className={styles.confirmed_order_item_content__dep}>{customerId}</div>
                <div className={styles.confirmed_order_item_content__info}>
                    <table>
                        <tr>
                            <th>Expect: </th>
                            <td>{dateConvert(expectedTime, ['YYYY','-','MM','-','DD'])}</td>
                        </tr>
                        <tr>
                            <th>Package: </th>
                            <td>{productList.reduce((pre, now) => {
                                return pre + now.quantity
                            }, 0)}</td>
                        </tr>
                    </table>
                </div>
                <div className={styles.confirmed_order_item_content__btn}>
                    <Button type="link" onClick={() => setOpen(true)}>Detail</Button>
                </div>
            </div>
            {/*底部时间*/}
            <div className={styles.confirmed_order_item_time}>
                <span>{dateConvert(orderDate)}</span>
            </div>
        </div>
            <Modal
                title="Modal 1000px width"
                centered
                open={open}
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
                width={1000}
            >
              <StatusDetails/>
            </Modal>
        </>

    )
}
