import {message, Modal, Spin} from "antd";
import styles from "@/components/Workbench/production/styles.module.css";
import {OrderForm} from "@/components/Global/OrderForm";
import {CombineOrderDetails} from "@/components/Details/CombineOrderDetails";
import {UpdateMaterial} from "@/components/Workbench/production/UpdateMaterial";
import React, {useEffect, useRef, useState} from "react";
import {
    CombineProductItem, CombineShipItem,
    finishOrder,
    getProductionOrder,
    getShipmentOrder,
    modifyMaterialInventory
} from "@/apis/order";
import {ShipOrderForm} from "@/components/Order/ShipOrderForm";
import {UpdateShipInfo} from "@/components/Workbench/shipment/UpdateShipInfo";
import {selectIsUpdate, setUpdate} from "@/features/notification/notificationSlice";
import {useAppDispatch, useAppSelector} from "@/hooks";

const reference = {pending: false, fulfilled: true}

export const ShipmentOrder = ({type}: { type: 'pending' | 'fulfilled'}) => {
    const dispatch = useAppDispatch()
    const timer = useRef<NodeJS.Timeout | null>(null)
    const [loading, setLoading] = useState(false)
    const [combinedData, setCombinedData] = useState<CombineShipItem[]>([])
    const [detailOpen, setDetailOpen] = useState(false);
    const [updateOpen, setUpdateOpen] = useState(false);
    const currentId = useRef('')
    const currentProductionOrderLength = useRef(0)
    const isUpdate = useAppSelector(selectIsUpdate)
    const latestMaterialUsageObj = useRef<{ id: string, materialList: { [key: string]: number } }>({
        id: "",
        materialList: {}
    })
    const latestMaterialUsage = useRef<Array<{ materialId: string, productionId: string, weight: number }>>([])

    useEffect(() => {
        (async function () {
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

    const getCombinedData = async () => {
        setLoading(true)
        const res = await getShipmentOrder( {isShipped: reference[type]},{limit: -1, offset: 1})
        if (res.data !== null) {
            setCombinedData(res.data.records)
            setLoading(false)
        }
    }
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
    const getLatestArray = async (weight: string, productionId: string, materialId: string, length: number) => {
        currentProductionOrderLength.current = length
        latestMaterialUsageObj.current.id = productionId
        if (weight !== '') {
            latestMaterialUsageObj.current.materialList[materialId] = Number(weight)
        } else {
            delete latestMaterialUsageObj.current.materialList[materialId]
        }
        console.log(latestMaterialUsageObj.current)
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
                    weight: Number(latestMaterialUsageObj.current.materialList[item]) * (-1),
                    productionId: latestMaterialUsageObj.current.id
                })
            })
            await modifyMaterialInventory(latestMaterialUsage.current)
            await finishOrder([latestMaterialUsageObj.current.id])
            setUpdateOpen(false)
            latestMaterialUsage.current = []
            await getCombinedData()
        }
    }
    return (
        <Spin spinning={loading}>
            <div className={styles.pending_container}>
                <ShipOrderForm data={combinedData} action={pendingOrderOption} expectColumn={ reference[type] ? ['carPlate', 'leavingTime'] : [] }/>
            </div>
            <Modal
                title="Shipment Order Details"
                centered
                destroyOnClose={true}
                open={detailOpen}
                footer={null}
                onCancel={() => setDetailOpen(false)}
                width={1200}
            >
                <CombineOrderDetails id={currentId.current} type={'shipment'}/>
            </Modal>
            <Modal
                title="Update Shipment Information"
                centered
                destroyOnClose={true}
                open={updateOpen}
                okText={'confirm'}
                onOk={()=>setUpdateOpen(false)}
                onCancel={() => setUpdateOpen(false)}
                width={1000}
            >
                <UpdateShipInfo id={currentId.current}/>
            </Modal>
        </Spin>
    )
}
