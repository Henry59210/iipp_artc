import styles from "@/components/Workbench/production/styles.module.css";
import {OrderForm} from "@/components/Global/OrderForm";
import {Button, message, Modal, Spin} from "antd";
import {CombineOrderDetails} from "@/components/Details/CombineOrderDetails";
import React, {useEffect, useRef, useState} from "react";
import {useAppDispatch, useAppSelector} from "@/hooks";
import {selectRole} from "@/features/user/userSlice";
import {
    CombineProductItem, finishOrder,
    getProductionCombineOrder,
    getProductionOrder, modifyMaterialInventory, modifyProductInventory,
    OrderInfo, ProductRequiredListItem,
    rollbackProductionOrder
} from "@/apis/order";
import {UpdateMaterial} from "@/components/Workbench/production/UpdateMaterial";
import {selectIsUpdate, setUpdate} from "@/features/notification/notificationSlice";
import {dispatch} from "jest-circus/build/state";
import {useDispatch} from "react-redux";

const reference = {pending: false, fulfilled: true}

type MaterialUsageObjType = {
    id: string,
    materialList: { [key: string]: { expected: number, actual: number } },
    productList: {productId: string, quantity: number}[]
}



export const ProductionOrder = ({type}: { type: 'pending' | 'fulfilled' }) => {
    const dispatch = useAppDispatch()
    const timer = useRef<NodeJS.Timeout | null>(null)
    const [loading, setLoading] = useState(false)
    const [combinedData, setCombinedData] = useState<CombineProductItem[]>([])
    const [detailOpen, setDetailOpen] = useState(false);
    const [updateOpen, setUpdateOpen] = useState(false);
    const currentId = useRef('')
    const currentProductionOrderLength = useRef(0)
    const isUpdate = useAppSelector(selectIsUpdate)
    const latestMaterialUsageObj = useRef<MaterialUsageObjType>({
        id: "",
        materialList: {},
        productList: []
    })
    const latestMaterialUsage = useRef<Array<{ materialId: string, productionId: string, weight: number, expectedWeight: number }>>([])

    useEffect(() => {
        (async function () {
            await getCombinedData()
        })()
    }, [])
    useEffect(() => {
        if (isUpdate) {
            (async function () {
                await getCombinedData()
            })()
        }
        dispatch(setUpdate(false))
    }, [isUpdate])

    const getCombinedData = async () => {
        setLoading(true)
        const res = await getProductionOrder({isFinished: reference[type]}, {limit: -1, offset: 1})
        if (res.data !== null) {
            setCombinedData(res.data.records)
            setLoading(false)
        }
    }
    //pending和fulfilled可以通用
    const pendingOrderOption = async ({id}: { id: string }, item: 'Update' | 'Detail') => {
        currentId.current = id
        if (item === 'Detail') {
            setDetailOpen(true)
        } else if (item === 'Update') {
            setUpdateOpen(true)
        }
    }
    const getLength = (length: number) => {
        currentProductionOrderLength.current = length
    }
    const getLatestArray = async (weight: string, expectedWeight: string, productionId: string, materialId: string, length: number) => {
        currentProductionOrderLength.current = length
        latestMaterialUsageObj.current.id = productionId
        if (weight !== '') {
            latestMaterialUsageObj.current.materialList[materialId] = {
                expected: 0,
                actual: 0
            }
            latestMaterialUsageObj.current.materialList[materialId].expected = Number(expectedWeight)
            latestMaterialUsageObj.current.materialList[materialId].actual = Number(weight)
        } else {
            delete latestMaterialUsageObj.current.materialList[materialId]
        }
        console.log(latestMaterialUsageObj.current)
    }

    const getProductList = (productList: ProductRequiredListItem[]) => {
        const result:{productId: string, quantity: number}[] = []
        productList.forEach(item => {
            result.push({productId: item.productId, quantity: item.quantity})
        })
        latestMaterialUsageObj.current.productList = result
    }

    const updateMaterialUsage = async () => {
        if (Object.keys(latestMaterialUsageObj.current.materialList).length !== currentProductionOrderLength.current) {
            if (timer.current === null) {
                message.warning('Please fill all usage')
                timer.current = setTimeout(() => {
                    timer.current = null
                }, 3000)
            }
        } else {
            Object.keys(latestMaterialUsageObj.current.materialList).forEach(item => {
                latestMaterialUsage.current.push({
                    materialId: item,
                    weight: Number(latestMaterialUsageObj.current.materialList[item].actual),
                    expectedWeight: Number(latestMaterialUsageObj.current.materialList[item].expected),
                    productionId: latestMaterialUsageObj.current.id
                })
            })
            await modifyMaterialInventory(latestMaterialUsage.current)
            await modifyProductInventory(latestMaterialUsageObj.current.productList)
            await finishOrder([latestMaterialUsageObj.current.id])
            cancelMaterialUsage()
            await getCombinedData()
        }
    }
    const cancelMaterialUsage = () => {
        setUpdateOpen(false)
        latestMaterialUsage.current = []
        latestMaterialUsageObj.current = {
            id: "",
            materialList: {},
            productList: []
        }
    }
    return (
        <Spin spinning={loading}>
            <div className={styles.pending_container}>
                <OrderForm data={combinedData} checkbox={false} combine={true}
                           node={type === 'pending' ? ['Detail', 'Update'] : ['Detail']}
                           action={pendingOrderOption}/>
            </div>
            <Modal
                title="Production Order Details"
                centered
                destroyOnClose={true}
                open={detailOpen}
                footer={null}
                onCancel={() => setDetailOpen(false)}
                width={1200}
            >
                <CombineOrderDetails id={currentId.current} type={'production'}/>
            </Modal>
            <Modal
                title="Update actual usage of material"
                centered
                destroyOnClose={true}
                open={updateOpen}
                okText={'confirm'}
                onOk={updateMaterialUsage}
                onCancel={cancelMaterialUsage}
                width={1000}
            >
                <UpdateMaterial id={currentId.current} setProductsList={getProductList} getLatestArray={getLatestArray} getLength={getLength}/>
            </Modal>
        </Spin>
    )
}
