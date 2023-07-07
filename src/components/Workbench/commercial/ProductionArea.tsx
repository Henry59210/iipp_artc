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

// const data: OrderInfo[] = [
//     {
//         id: '1',
//         customerId: 'Singapore',
//         orderDate: '2020-3-4',
//         expectedTime: '2020-3-6',
//         status: 'wait for production',
//         productList: [{id: '2222', productName: 'MIX CHOC DRINK KR 560G 16/CS', quantity: 4000}]
//     }, {
//         id: '2',
//         customerId: 'Singapore',
//         orderDate: '2020-3-4',
//         expectedTime: '2020-3-6',
//         status: 'wait for production',
//         productList: [{id: '2222', productName: 'MIX CHOC DRINK KR 560G 16/CS', quantity: 4000}]
//     }, {
//         id: '3',
//         customerId: 'Singapore',
//         orderDate: '2020-3-4',
//         expectedTime: '2020-3-6',
//         status: 'wait for production',
//         productList: [{id: '2222', productName: 'MIX CHOC DRINK KR 560G 16/CS', quantity: 4000}]
//     }, {
//         id: '4',
//         customerId: 'Singapore',
//         orderDate: '2020-3-4',
//         expectedTime: '2020-3-6',
//         status: 'wait for production',
//         productList: [{id: '2222', productName: 'MIX CHOC DRINK KR 560G 16/CS', quantity: 4000}]
//     }, {
//         id: '5',
//         customerId: 'Singapore',
//         orderDate: '2020-3-4',
//         expectedTime: '2020-3-6',
//         status: 'wait for production',
//         productList: [{id: '2222', productName: 'MIX CHOC DRINK KR 560G 16/CS', quantity: 4000}]
//     }, {
//         id: '6',
//         customerId: 'Singapore',
//         orderDate: '2020-3-4',
//         expectedTime: '2020-3-6',
//         status: 'wait for production',
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

const preData = {
    orderId: '',
    customerId: '',
    expectedTimeBegin: '',
    expectedTimeEnd: '',
    orderDateBegin: '',
    orderDateEnd: '',
    status: 'Pending Notify PR'
}
//获取合并后的订单
export const ProductionArea = () => {
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
        const res = await getOrdersForCommercial(filterData, {limit: -1, offset: 1})
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
                        description={<OrderFilter type={'employee'} getFilterData={getFilterData} status={'Pending Notify PR'}
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
                <Spin spinning={loading}>
                    <div className={styles.combo_container_filter}>
                        <div>{hintText_right}</div>
                    </div>
                    <div className={styles.combo_container_form}>
                        <OrderForm data={combinedData} checkbox={false} combine={true} node={['Detail', 'Rollback']}
                                   action={prodOrderOption}/>
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
                </Spin>
            </div>
        </div>
    );
}
