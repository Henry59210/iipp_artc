import styles from "./styles.module.css"
import {useEffect, useState} from "react";
import {materialInventoryItem, OrderDetail, productInventoryItem} from "@/apis/order";
import {Popover, Table, Tag} from "antd";
import type {ColumnsType} from 'antd/es/table';
import {InfoCircleOutlined} from '@ant-design/icons';
import {productFormatConvert} from "@/utilities/usefulTools";
import {func} from "prop-types";

const testData = {
    id: "string",
    status: "purchase",
    type: "order",
    orderDate: "string",
    expectedTime: "string",
    customerId: 'India',
    productInventoryList: [
        {
            productName: 'MIX CHOC DRINK KR 560G 16/CS',
            orderPkg: 1000,
            inventoryPkg: 2000,
            needPkg: 0
        },
        {
            productName: 'MIX CHOC DRINK KR 560G 16/CS',
            orderPkg: 1000,
            inventoryPkg: 2000,
            needPkg: 0
        },
        {
            productName: 'MIX CHOC DRINK KR 560G 16/CS',
            orderPkg: 1000,
            inventoryPkg: 2000,
            needPkg: 0
        },
        {
            productName: 'MIX CHOC DRINK KR 560G 16/CS',
            orderPkg: 1000,
            inventoryPkg: 2000,
            needPkg: 0
        },
        {
            productName: 'MIX CHOC DRINK KR 560G 16/CS',
            orderPkg: 1000,
            inventoryPkg: 2000,
            needPkg: 0
        },
        {
            productName: 'MIX CHOC DRINK KR 560G 16/CS',
            orderPkg: 1000,
            inventoryPkg: 2000,
            needPkg: 0
        }, {
            productName: 'MIX CHOC DRINK KR 560G 16/CS',
            orderPkg: 1000,
            inventoryPkg: 2000,
            needPkg: 0
        },
        {
            productName: 'MIX CHOC DRINK KR 560G 16/CS',
            orderPkg: 2000,
            inventoryPkg: 1000,
            needPkg: 0
        }],
    materialInventoryList: [
        {
            materialName: 'MIX CHOC DRINK KR 560G 16/CS',
            materialDemand: 2000,
            materialInventory: 1000,
            purchaseDemand: 0
        },
        {
            materialName: 'MIX CHOC DRINK KR 560G 16/CS',
            materialDemand: 1000,
            materialInventory: 2000,
            purchaseDemand: 0
        }
    ]
}

const status2color: { [key: string]: string } = {
    purchase: 'red',
    producing: 'orange',
    shipment: 'green'
}

export const InventoryDetails = (props: { id: string }) => {
    const [orderDetail, setOrderDetail] = useState<OrderDetail>({
        customerId: "",
        expectedTime: "",
        id: "",
        materialInventoryList: [],
        orderDate: "",
        productInventoryList: [],
        status: "",
        type: ""
    })
    const [unconfirmedOrderStatus, setUnconfirmedOrderStatus] = useState<'purchase' | 'producing' | 'shipment'>('purchase')
    useEffect(() => {
        const res = testData
        setOrderDetail(res)
    }, [])
    useEffect(() => {
        setUnconfirmedOrderStatus(generateStatus())
    })
    const generateStatus = () => {
        if (orderDetail.status === 'pending purchase') return 'purchase'
        let unbornProduct = orderDetail.productInventoryList.reduce((a, b) => {
            return a + b.needPkg
        }, 0)
        let materialPurchase = orderDetail.materialInventoryList.reduce((a, b) => {
            return a + b.purchaseDemand
        }, 0)
        console.log(unbornProduct, materialPurchase)
        return materialPurchase ? 'purchase' : unbornProduct ? 'producing' : 'shipment'
    }
    return (
        <div className={styles.inventory_container}>
            <div className={styles.inventory_container_title}>
                <div className={styles.inventory_container_title__country}>{orderDetail.customerId}</div>
                <div className={styles.inventory_container_title__info}>
                    <div>type: <span className={styles.type}>{orderDetail.type}</span></div>
                    <div>status: <span style={{color: 'black'}}>waiting for</span> <span
                        style={{
                            color: status2color[unconfirmedOrderStatus],
                            fontSize: '20px'
                        }}>{unconfirmedOrderStatus}</span></div>
                </div>
            </div>
            <div className={styles.inventory_container_content}>
                <div className={styles.inventory_container_content__product}>
                    <InventoryForm orderDetail={testData} type={'product'} status={unconfirmedOrderStatus}/>
                </div>
                <div className={styles.inventory_container_content__raw}>
                    <InventoryForm orderDetail={testData} type={'material'} status={unconfirmedOrderStatus}/>
                </div>
            </div>
        </div>
    )
}

function nameRender(text: string) {
    return (<div>
        <span style={{
            fontWeight: 'bolder',
            whiteSpace: 'nowrap'
        }}>{productFormatConvert(text).mainName}</span>
        <br/>
        <span style={{
            whiteSpace: 'nowrap'
        }}>{productFormatConvert(text).specification}</span>
    </div>)}

function amountTitle(text:string, unit: string) {
    return (
        <div>
            <div><span>{text}</span> <br/> <span>{`( ${unit} )`}</span></div>
        </div>
    )
}

const InventoryForm = ({
                           orderDetail,
                           type,
                           status
                       }: { orderDetail: OrderDetail, type: 'material' | 'product', status: 'purchase' | 'producing' | 'shipment' }) => {
    const data = type === 'material' ? orderDetail.materialInventoryList : orderDetail.productInventoryList
    let columns: ColumnsType<productInventoryItem | materialInventoryItem>

    switch (type){
        case "product":
            columns = [
                {
                    title: 'Product',
                    dataIndex: 'productName',
                    key: 'productName',
                    align: 'center',
                    width: 160,
                    render: (text)=>nameRender(text),
                },
                {
                    title: () => amountTitle('Order', 'PKG'),
                    dataIndex: 'orderPkg',
                    key: 'orderPkg',
                    align: 'center'
                },
                {
                    title: () => amountTitle('Inventory', 'PKG'),
                    dataIndex: 'inventoryPkg',
                    key: 'inventoryPkg',
                    align: 'center'
                },
                {
                    title: () => amountTitle('Unborn', 'PKG'),
                    dataIndex: 'needPkg',
                    key: 'needPkg',
                    align: 'center',
                    render: (text) => <span
                        style={{color: text ? 'red' : '', fontWeight: 'bolder'}}>{text === 0 ? '-' : text}</span>
                },
            ];
            break;
        case 'material':
            columns = [
                {
                    title: () => (<div>Material
                        <Popover content='Materials list for unborn products'>
                            <InfoCircleOutlined style={{paddingLeft: '7px', color: '#b9b9b9', cursor: 'pointer'}}/>
                        </Popover></div>),
                    key: 'materialName',
                    dataIndex: 'materialName',
                    align: 'center',
                    width: 160,
                    render: (text)=>nameRender(text),
                },
                {
                    title: () => amountTitle('Need', 'KG'),
                    dataIndex: 'materialDemand',
                    key: 'materialDemand',
                    align: 'center'
                },
                {
                    title: () => amountTitle('Inventory', 'KG'),
                    dataIndex: 'materialInventory',
                    key: 'materialInventory',
                    align: 'center'
                },
                {
                    title: () => amountTitle('Purchase', 'KG'),
                    dataIndex: 'purchaseDemand',
                    key: 'purchaseDemand',
                    align: 'center',
                    render: (text) => <span
                        style={{color: text ? 'red' : '', fontWeight: 'bolder'}}>{text === 0 ? '-' : text}</span>
                },
            ];
            break
    }

            if (type === 'material' && status !== 'purchase') columns.splice(3, 1)
            return <Table pagination={false} columns={columns} dataSource={data} sticky={true}/>
}
