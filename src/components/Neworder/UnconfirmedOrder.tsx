import styles from "@/components/Neworder/styles.module.css";
import {Button, Divider, Modal, Popover, Tooltip, Typography} from "antd";
import React, {useEffect, useState} from "react";
import {OrderInfo} from "@/apis/order";
import {dateConvert} from "@/utilities/usefulTools";
import {StatusDetails} from "@/components/Details/StatusDetails";
import {ItemText} from "@/components/Global/ItemText";
import {InventoryDetails} from "@/components/Details/InventoryDetails";
import {color} from "@antv/g2plot/lib/plots/dual-axes/adaptor";
const { Text } = Typography;

const testData: Array<OrderInfo> = [
    {
        customerId: "Singapore",
        expectedTime: "2023-04-26T08:29:22.081Z",
        id: "1124434426524",
        orderDate: "2023-04-26T08:29:22.081Z",
        productList: [
            {
                id: "string",
                productName: "MIX CHOC DRINK KR 560G 16/CS",
                quantity: 1000
            },
            {
                id: "string",
                productName: "MIX CHOC DRINK KR 560G 16/CS",
                quantity: 1000
            },
            {
                id: "string",
                productName: "MIX CHOC DRINK KR 560G 16/CS",
                quantity: 1000
            }
        ],
        status: "unconfirmed"
    },
    {
        customerId: "China",
        expectedTime: "2023-04-26T08:29:22.081Z",
        id: "1164233426524",
        orderDate: "2023-04-26T08:29:22.081Z",
        productList: [
            {
                id: "string",
                productName: "MIX CHOC DRINK KR 560G 16/CS",
                quantity: 1000
            },
            {
                id: "string",
                productName: "MIX CHOC DRINK KR 560G 16/CS",
                quantity: 1000
            },
            {
                id: "string",
                productName: "MIX CHOC DRINK KR 560G 16/CS",
                quantity: 1000
            },
            {
                id: "string",
                productName: "MIX CHOC DRINK KR 560G 16/CS",
                quantity: 1000
            },
            {
                id: "string",
                productName: "MIX CHOC DRINK KR 560G 16/CS",
                quantity: 1000
            },
            {
                id: "string",
                productName: "MIX CHOC DRINK KR 560G 16/CS",
                quantity: 1000
            },
            {
                id: "string",
                productName: "MIX CHOC DRINK KR 560G 16/CS",
                quantity: 1000
            },
            {
                id: "string",
                productName: "MIX CHOC DRINK KR 560G 16/CS",
                quantity: 1000
            },
            {
                id: "string",
                productName: "MIX CHOC DRINK KR 560G 16/CS",
                quantity: 1000
            }, {
                id: "string",
                productName: "MIX CHOC DRINK KR 560G 16/CS",
                quantity: 1000
            },

            {
                id: "string",
                productName: "MIX CHOC DRINK KR 560G 16/CS",
                quantity: 10
            },
            {
                id: "string",
                productName: "MIX CHOC DRINK KR 560G 16/CS",
                quantity: 10
            },
            {
                id: "string",
                productName: "MIX CHOC DRINK KR 560G 16/CS",
                quantity: 10
            },
            {
                id: "string",
                productName: "MIX CHOC DRINK KR 560G 16/CS",
                quantity: 10
            },
        ],
        status: "unconfirmed"
    }

]

export const UnconfirmedOrder = () => {
    const [orderList, setOrderList] = useState<Array<OrderInfo>>([])
    useEffect(() => {
        const res = testData
        setOrderList(res)
    }, [])

    return (
        <div className={styles.unconfirmed_order_container}>
            <div className={styles.container_title}>
                <span>unconfirmed Order List: </span>
            </div>
            {
                orderList.map(item => <UnconfirmedOrderItem {...item}/>)
            }
        </div>
    )
}

const UnconfirmedOrderItem = (orderInfo: OrderInfo) => {
    const [open, setOpen] = useState(false);

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
                             content={<div className={styles.overview_content}>{productList.map(item=><ItemText title={item.productName} value={item.quantity}/>) }</div>}>
                        <div className={styles.overview}>overview</div>
                    </Popover>
                    <div className={styles.order_items_container}>
                        { productList.map(item=><ItemText title={item.productName} value={item.quantity}/>) }
                    </div>
                </div>
                <div className={styles.unconfirmed_order_item_content__btn}>
                    <Button type="link" onClick={() => setOpen(true)}>Detail</Button>
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
                okText={'confirm'}
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
                width={1000}
            >
              <InventoryDetails id={id}/>
            </Modal>
        </>

    )
}
