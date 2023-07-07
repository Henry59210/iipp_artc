import styles from "./styles.module.css"
import {Col, Row, Space, Timeline, TimelineItemProps, Typography} from "antd";
import {ClockCircleOutlined} from "@ant-design/icons";
import {useAppSelector} from "@/hooks";
import {selectRole} from "@/features/user/userSlice";
import {OrderInfo, ProductInfo} from "@/apis/order";
import React, {useState} from "react";
import {OrderStatus, statusOrderList} from "@/components/Global/statusList";
import {ItemText} from "@/components/Global/ItemText";
import {dateConvert} from "@/utilities/usefulTools";

const {Title} = Typography;

export const StatusDetails = ({orderInfo}: { orderInfo: OrderInfo | undefined }) => {
    const [isConfirmed, setIsConfirmed] = useState(false)
    // orderInfo = {
    //     customerId: "", expectedTime: "", id: "", orderDate: "", productList: [], status: "",
    //     orderStatusHistoryList: [
    //         "New Order",
    //         "Pending RM",
    //         "Pending Notify PR",
    //         "Pending PR confirmed",
    //         "PR confirmed",
    //         "Production Finished",
    //         "Pending Shipment Confirmed",
    //         "Shipment Confirmed",
    //         "Shipment Arranged",
    //     ]
    // }
    const generateTimeline = () => {
        const timeline: TimelineItemProps[] | undefined = []
        if (orderInfo === undefined) {
            return []
        } else {
            const statusHistory = orderInfo.orderStatusHistoryList

            timeline.push({
                color: 'green',
                children: 'New Order',
            })
            if (statusHistory.length === 1 && statusHistory[0] === 'New Order') {
                if (!isConfirmed) setIsConfirmed(true)
            } else {
                let referenceForm = Object.keys(statusOrderList)
                for (let i = statusOrderList[statusHistory[1]]; i < referenceForm.length; i++) {
                    timeline.push(i < (statusHistory.length + statusOrderList[statusHistory[1]] - 1) ? {
                            color: 'green',
                            children: referenceForm[i]
                        } : {
                            color: 'gray',
                            children: referenceForm[i]
                        }
                    )
                }
            }
            return timeline
        }
    }
    const generateOrderInfo = () => {
        if (!orderInfo) return null
        return <div style={{width: '70%', paddingTop: 20}}>
            <Row>
                <Col span={10}>
                    <Space direction="vertical" size="middle" style={{fontWeight: 'bolder'}}>
                        <li>Order Id:</li>
                        <li>Country:</li>
                        <li>Expected Time:</li>
                        <li>Order Date:</li>
                    </Space>
                </Col>
                <Col span={14}>
                    <Space direction="vertical" size="middle">
                        <li>{orderInfo.id}</li>
                        <li>{orderInfo.customerId}</li>
                        <li>{dateConvert(orderInfo.expectedTime,['YYYY','-','MM','-','DD'])}</li>
                        <li>{dateConvert(orderInfo.orderDate,['YYYY','-','MM','-','DD'])}</li>
                    </Space>
                </Col>
            </Row>
        </div>
    }
    return (
        <div className={styles.status_container}>
            <div className={styles.status_container_status}>
                <Timeline
                    pending={isConfirmed ? 'Pending confirmed...' : null}
                    items={generateTimeline()}
                ></Timeline>
            </div>
            <div className={styles.status_container_info}>
                <div style={{width: '70%', textAlign: "left"}}>
                    <Title level={5}>OrderInfo: </Title>
                </div>
                {generateOrderInfo()}
            </div>
            <div className={styles.status_container_composition}>
                <div style={{width: '85%', textAlign: "left"}}>
                    <Title level={5}>ProductInfo: </Title>
                </div>
                <div className={styles.summary_items_container}>
                    {
                        orderInfo === undefined ? null
                            : orderInfo.productList.map(item => <ItemText
                                title={item.productName} value={item.quantity}/>)
                    }
                </div>
            </div>
        </div>
    )
}
