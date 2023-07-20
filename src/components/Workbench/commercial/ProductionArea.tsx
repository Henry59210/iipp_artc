import styles from "@/components/Workbench/commercial/styles.module.css"
import {OrderFilter} from "@/components/Order/OrderFilter";
import {OrderForm} from "@/components/Global/OrderForm";
import {Button, message, Modal, Popconfirm, Popover, Spin} from "antd";
import {InventoryDetails} from "@/components/Details/InventoryDetails";
import React, {useEffect, useRef, useState} from "react";
import {
    CombineOrderResponse, CombineProductItem,
    getOrdersForCommercial,
    getProductionCombineOrder,
    OrderInfo,
    OrderRequest, packageProductionOrder, ProductInfo, rollbackProductionOrder
} from "@/apis/order";
import {CombineOrderDetails} from "@/components/Details/CombineOrderDetails";
import {ItemText} from "@/components/Global/ItemText";
import {useAppSelector} from "@/hooks";
import {selectRole} from "@/features/user/userSlice";

const preData = {
    orderId: '',
    customerDept: '',
    expectedTimeBegin: '',
    expectedTimeEnd: '',
    orderDateBegin: '',
    orderDateEnd: '',
    status: 'Pending Notify Prod'
}
//获取合并后的订单
export const ProductionArea = () => {
    const role = useAppSelector(selectRole)
    const [loading, setLoading] = useState(false)
    const [orderData, setOrderData] = useState<OrderInfo[]>([])
    const [combinedData, setCombinedData] = useState<CombineProductItem[]>([])
    const [inventoryOpen, setInventoryOpen] = useState(false);
    const [prodOpen, setProdOpen] = useState(false);
    const currentId = useRef('')
    const [selectedItems, setSelectedItems] = useState<OrderInfo[]>([]);
    const selectedOrders = useRef<OrderInfo[]>([])
    const [toProdOrder, setToProdOrder] = useState(false)
    const hintText_left = 'Pending production'
    const hintText_right = 'Pending production confirm'

    useEffect(() => {
        (async function () {
            await getFilterData(preData)
            await getCombinedData()
        })()
    }, [])

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
        const res = await getProductionCombineOrder({limit: -1, offset: 1})
        if (res.data !== null) {
            setCombinedData(res.data.records)
            setLoading(false)
        }
    }
    //选中checkbox的回调
    const getSelectedOrder = (selectedRows: OrderInfo[]) => {
        selectedOrders.current = selectedRows
        setSelectedItems(selectedRows)
        setToProdOrder(Boolean(selectedRows.length))
    }

    const openInventoryModal = ({id}: { id: string }) => {
        currentId.current = id
        setInventoryOpen(true)
    }

    const prodOrderOption = async ({id}: { id: string }, item: 'Rollback' | 'Detail') => {
        if (item === 'Detail') {
            currentId.current = id
            setProdOpen(true)
        } else if (item === 'Rollback') {
            const res = await rollbackProductionOrder(id)
            if (res.code === '200') {
                await getFilterData(preData)
                await getCombinedData()
            }
        }
    }

    //选中之后点击打包的回调
    const generateProdOrder = async () => {
        const selectedIds = selectedOrders.current.map(item => item.id)
        const res = await packageProductionOrder(selectedIds)
        if (res.code === '200') {
            await getFilterData(preData)
            await getCombinedData()
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
            {/*待生产订单*/}
            <div className={styles.normal_order_container}>
                <div className={styles.combo_container_filter}>
                    <div>{hintText_left}</div>
                    <Popconfirm
                        icon={''}
                        title=""
                        okButtonProps={{style: {display: 'none'}}}
                        showCancel={false}
                        description={<OrderFilter type={'employee'} getFilterData={getFilterData}
                                                  status={'Pending Notify Prod'}
                                                  combine={false}/>}
                    >
                        <Button style={{width: '100px'}}>Filter</Button>
                    </Popconfirm>
                </div>
                <div className={styles.combo_container_form}>
                    <Spin spinning={loading}>
                        <OrderForm expectColumn={['id', 'expectedTime']} data={orderData} checkbox={true}
                                   combine={false} selectedAction={getSelectedOrder}
                                   node={['Detail']} action={openInventoryModal}/>
                    </Spin>
                </div>
                <div className={`${styles.package_order} ${toProdOrder ? styles.package_order_active : ''}`}>
                    {toProdOrder ?
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
                    open={inventoryOpen}
                    footer={null}
                    onOk={() => setInventoryOpen(false)}
                    onCancel={() => setInventoryOpen(false)}
                    width={1000}
                >
                    <InventoryDetails id={currentId.current}/>
                </Modal>
            </div>
            {/*合并后的生产订单*/}
            <div className={styles.package_order_container}>
                <div className={styles.combo_container_filter}>
                    <div>{hintText_right}</div>
                </div>
                <div className={styles.combo_container_form}>
                    <Spin spinning={loading}>
                        <OrderForm data={combinedData} checkbox={false} combine={true} node={['Detail', 'Rollback']}
                                   action={prodOrderOption}/>
                    </Spin>

                </div>
                <Modal
                    title="Production Order Details"
                    centered
                    destroyOnClose={true}
                    open={prodOpen}
                    footer={null}
                    onCancel={() => setProdOpen(false)}
                    width={1200}
                >
                    <CombineOrderDetails id={currentId.current} type={'production'}/>
                </Modal>
            </div>
        </div>
    );
}
