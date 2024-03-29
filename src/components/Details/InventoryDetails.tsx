import styles from "./styles.module.css"
import {useEffect, useState} from "react";
import {DemandMaterialListItem, getOrderInventoryDetail, OrderDetail, ProductInventoryItem} from "@/apis/order";
import {Popover, Spin, Table, Tag} from "antd";
import type {ColumnsType} from 'antd/es/table';
import {InfoCircleOutlined} from '@ant-design/icons';
import {productFormatConvert} from "@/utilities/usefulTools";
import {func} from "prop-types";
import {useAppSelector} from "@/hooks";
import {selectRole} from "@/features/user/userSlice";


const status2color: { [key: string]: string } = {
    purchasing: 'red',
    producing: 'orange',
    shipment: 'green'
}

export const InventoryDetails = ({orderDetail, id, getStatus}: { orderDetail?: OrderDetail, id?: string, getStatus?: (status: string)=>void }) => {
    const role = useAppSelector(selectRole)
    const [unconfirmedOrderStatus, setUnconfirmedOrderStatus] = useState<'purchasing' | 'producing' | 'shipment'>('purchasing')
    const [_orderDetail, setOrderDetail] = useState<OrderDetail>({
        customerId: "",
        customerDept: "",
        executableState: "",
        expectedTime: "",
        id: "",
        orderDate: "",
        status: "",
        productDetailList: [],
        demandMaterialList: []
    })
    useEffect(() => {
        if(id !== undefined && orderDetail === undefined) {
            (async function(){
                console.log('id',id)
                const res = await getOrderInventoryDetail(id, role)
                if(res.data !== null) {
                    setOrderDetail(res.data)
                    if (getStatus !== undefined)
                        getStatus(res.data.executableState)
                    setUnconfirmedOrderStatus(generateStatus(res.data))
                }
            })()

        } else if(id === undefined && orderDetail !== undefined) {
            console.log('orderDetail',orderDetail)
            setOrderDetail(orderDetail)
            setUnconfirmedOrderStatus(generateStatus(orderDetail))
        }

    },[])
    const generateStatus = (data:OrderDetail) => {
        const referForm:{[key:string]: 'purchasing' | 'producing' | 'shipment'} = {
            'Deliverable': 'shipment',
            'Need production': 'producing',
            'Need procurement': 'purchasing'
        }
        return referForm[data.executableState]
    }
    return (
        <>
            <Spin spinning={_orderDetail.id===''}>
                <div className={styles.inventory_container}>
                    <div className={styles.inventory_container_title}>
                        <div className={styles.inventory_container_title__country}>{_orderDetail.customerDept}</div>
                        <div className={styles.inventory_container_title__info}>
                            {/*<div>type: <span className={styles.type}>{_orderDetail.type}</span></div>*/}
                            <div>status: <span style={{color: 'black'}}>waiting for</span> <span
                                style={{
                                    color: status2color[unconfirmedOrderStatus],
                                    fontSize: '20px'
                                }}>{unconfirmedOrderStatus}</span></div>
                        </div>
                    </div>
                    <div className={styles.inventory_container_content}>
                        <div className={styles.inventory_container_content__product}>
                            <InventoryForm orderDetail={_orderDetail} type={'product'} status={unconfirmedOrderStatus}/>
                        </div>
                        {
                            _orderDetail.demandMaterialList.length ?
                                <div className={styles.inventory_container_content__raw}>
                                    <InventoryForm orderDetail={_orderDetail} type={'material'} status={unconfirmedOrderStatus}/>
                                </div> : null
                        }
                    </div>
                </div>
            </Spin>
        </>
    )
}

export function nameRender(text: string) {
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
                       }: { orderDetail: OrderDetail, type: 'material' | 'product', status: 'purchasing' | 'producing' | 'shipment' }) => {
    const data = type === 'material' ? orderDetail.demandMaterialList : orderDetail.productDetailList
    let columns: ColumnsType<ProductInventoryItem | DemandMaterialListItem>

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
                    dataIndex: 'orderQuantity',
                    key: 'orderQuantity',
                    align: 'center'
                },
                {
                    title: () => amountTitle('Inventory', 'PKG'),
                    dataIndex: 'inventoryQuantity',
                    key: 'inventoryQuantity',
                    align: 'center'
                },
                {
                    title: () => amountTitle('Unborn', 'PKG'),
                    dataIndex: 'needQuantity',
                    key: 'needQuantity',
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
                            <InfoCircleOutlined style={{paddingLeft: '7px', color: '#b9b9b9', cursor: 'pointer'}}
                                                />
                        </Popover></div>),
                    key: 'materialName',
                    dataIndex: 'materialName',
                    align: 'center',
                    width: 160,
                    render: (text)=>nameRender(text),
                },
                {
                    title: () => amountTitle('Need', 'KG'),
                    dataIndex: 'demandWeight',
                    key: 'demandWeight',
                    align: 'center'
                },
                {
                    title: () => amountTitle('Inventory', 'KG'),
                    dataIndex: 'inventoryWeight',
                    key: 'inventoryWeight',
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

            if (type === 'material' && status !== 'purchasing') columns.splice(3, 1)
            return <Table pagination={false} rowKey={record => type==='material' ? (record as DemandMaterialListItem).materialId : (record as ProductInventoryItem).productId} columns={columns} dataSource={data} sticky={true}/>
}
