import {OrderForm} from "@/components/Global/OrderForm";
import React, {useEffect, useRef, useState} from "react";
import styles from "@/components/Workbench/commercial/styles.module.css";
import {Button, Modal, Popconfirm, Popover, Spin} from "antd";
import {OrderFilter} from "@/components/Order/OrderFilter";
import {InventoryDetails} from "@/components/Details/InventoryDetails";
import {StatusDetails} from "@/components/Details/StatusDetails";
import {
    CombineProductItem,
    CombineShipItem, CombineShipItemOrders,
    getOrdersForCommercial,
    getShipCombineOrder, OrderDetail,
    OrderInfo,
    OrderRequest, packageProductionOrder, packageShipOrder, ProductInfo
} from "@/apis/order";
import {ItemText} from "@/components/Global/ItemText";
import {ShipOrderForm} from "@/components/Order/ShipOrderForm";
import {CombineOrderDetails} from "@/components/Details/CombineOrderDetails";
import {useAppDispatch, useAppSelector} from "@/hooks";
import {selectRole} from "@/features/user/userSlice";
import {selectIsUpdate, setUpdate} from "@/features/notification/notificationSlice";


const preData = {
    orderId: '',
    customerDept: [],
    expectedTimeBegin: '',
    expectedTimeEnd: '',
    orderDateBegin: '',
    orderDateEnd: '',
    status: ['Pending Notify Shipment']
}
//获取合并后的订单

export const ShipmentArea = () => {
    const role = useAppSelector(selectRole)
    const [loading, setLoading] = useState(false)
    const [orderData, setOrderData] = useState<OrderInfo[]>([])
    const [combinedData, setCombinedData] = useState<CombineShipItem[]>([])
    const [statusDetailOpen, setStatusDetailOpen] = useState(false);
    const [shipOpen, setShipOpen] = useState(false);
    const [toShipOrder, setToShipOrder] = useState(false)
    const [selectedItems, setSelectedItems] = useState<OrderInfo[]>([]);
    const currentId = useRef('');
    const selectedOrders = useRef<OrderInfo[]>([]);
    const dispatch = useAppDispatch()
    const isUpdate = useAppSelector(selectIsUpdate)
    const hintText_left = 'Pending shipment'
    const hintText_right = 'Pending shipment confirm'

    useEffect(() => {
        (async function () {
            await getFilterData(preData)
            await getCombinedData()
        })()
    }, [])

    useEffect(() => {
        if(isUpdate) {
            (async function () {
                await getCombinedData()
            })()
        }
        dispatch(setUpdate(false))
    }, [isUpdate])

    //左边普通订单的方法
    const getFilterData = async (filterData: OrderRequest) => {
        setLoading(true)
        const res = await getOrdersForCommercial(filterData, role, {limit: -1, offset: 1})
        if (res.data !== null) {
            setOrderData(res.data.records)
            setLoading(false)
        }
    }
    const getCombinedData = async () => {
        setLoading(true)
        const res = await getShipCombineOrder({limit: -1, offset: 1})
        if (res.data !== null) {
            setCombinedData(res.data.records)
            setLoading(false)
        }
    }
    //选中checkbox的回调
    const getSelectedOrder = (selectedRows: OrderInfo[]) => {
        selectedOrders.current = selectedRows
        setSelectedItems(selectedRows)
        setToShipOrder(Boolean(selectedRows.length))
    }
    const openInventoryModal = ({id}: { id: string }) => {
        currentId.current = id
        setStatusDetailOpen(true)
    }
    //右边的操作
    const prodOrderOption = ({id}: { id: string }) => {
        //pro订单的id
        currentId.current = id
        setShipOpen(true)
    }
    //选中之后点击打包的回调
    const generateProdOrder = async () => {
        const selectedIds = selectedOrders.current.map(item => item.id)
        const res = await packageShipOrder(selectedIds)
        if (res.code === '200') {
            await getFilterData(preData)
            await getCombinedData()
            setShipOpen(false)
        }
    }
    const generateSelectedDetail = () => {
        const productList: { [key: string]: ProductInfo } = {}
        selectedItems.forEach(item => {
            item.productList.forEach(productInfo => {
                if (productList[productInfo.id] === undefined) {
                    productList[productInfo.id] = productInfo
                } else {
                    productList[productInfo.id].quantity += productInfo.quantity
                }
            })
        })
        return (
            <div>
                {Object.keys(productList).map(item => (
                    <div key={item}>
                        <ItemText title={productList[item].productName} value={productList[item].quantity}></ItemText>
                    </div>)
                )}
            </div>
        )
    }
    return (
        <div className={styles.combo_container}>
            <div className={styles.normal_order_container} style={{flex:1}}>
                <div className={styles.combo_container_filter}>
                    <div>{hintText_left}</div>
                    <Popconfirm
                        icon={''}
                        title=""
                        okButtonProps={{style: {display: 'none'}}}
                        showCancel={false}
                        description={<OrderFilter type={'employee'} getFilterData={getFilterData} status={'Production Notify Shipment'}
                                                  combine={false}/>}
                    >
                        <Button style={{width: '100px'}}>Filter</Button>
                    </Popconfirm>
                </div>
                <div className={styles.combo_container_form}>
                    <Spin spinning={loading}>
                        <OrderForm expectColumn={['id','status']} data={orderData} checkbox={true} combine={false} selectedAction={getSelectedOrder}
                                   node={['Detail']} action={openInventoryModal}/>
                    </Spin>
                </div>
                <div className={`${styles.package_order} ${toShipOrder ? styles.package_order_active : ''}`}>
                    {toShipOrder ?
                        (
                            <Popover content={generateSelectedDetail()} title="Summary">
                                <Button onClick={generateProdOrder}>Package</Button>
                            </Popover>
                        )
                        : null}
                </div>
                <Modal
                    title="Inventory Details"
                    centered
                    destroyOnClose={true}
                    open={statusDetailOpen}
                    footer={null}
                    onOk={() => setStatusDetailOpen(false)}
                    onCancel={() => setStatusDetailOpen(false)}
                    width={1000}
                >
                    <StatusDetails orderInfo={
                        orderData.find(item=>item.id===currentId.current)
                    }/>
                </Modal>
            </div>
            <div className={styles.package_order_container} style={{flex:1}}>
                <div className={styles.combo_container_filter}>
                    <div>{hintText_right}</div>
                </div>
                <div className={styles.combo_container_form}>
                    <Spin spinning={loading}>
                        <ShipOrderForm data={combinedData} action={prodOrderOption} node={['Detail']} checkbox={false} />
                    </Spin>
                </div>
                <Modal
                    title="Inventory Details"
                    centered
                    destroyOnClose={true}
                    open={shipOpen}
                    footer={null}
                    onCancel={() => setShipOpen(false)}
                    width={1000}
                >
                    <CombineOrderDetails id={currentId.current} type={'shipment'}/>
                </Modal>
            </div>
        </div>
    )
}
