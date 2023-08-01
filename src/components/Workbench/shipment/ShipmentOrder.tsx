import {message, Modal, Spin} from "antd";
import styles from "@/components/Workbench/production/styles.module.css";
import {CombineOrderDetails} from "@/components/Details/CombineOrderDetails";
import React, {useEffect, useRef, useState} from "react";
import {
    CombineShipItem,
    getShipmentOrder,
} from "@/apis/order";
import {ShipOrderForm} from "@/components/Order/ShipOrderForm";
import {UpdateShipInfo} from "@/components/Workbench/shipment/UpdateShipInfo";
import {selectIsUpdate, setUpdate} from "@/features/notification/notificationSlice";
import {useAppDispatch, useAppSelector} from "@/hooks";

const reference = {pending: false, arranged: true}

export const ShipmentOrder = ({type}: { type: 'pending' | 'arranged' }) => {
    const dispatch = useAppDispatch()
    const timer = useRef<NodeJS.Timeout | null>(null)
    const [loading, setLoading] = useState(false)
    const [combinedData, setCombinedData] = useState<CombineShipItem[]>([])
    const [detailOpen, setDetailOpen] = useState(false);
    const [updateOpen, setUpdateOpen] = useState(false);
    const currentId = useRef('')
    const isUpdate = useAppSelector(selectIsUpdate)

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
        const res = await getShipmentOrder({isShipped: false, isArranged: reference[type]}, {limit: -1, offset: 1})
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

    const getSelectedOrder = (selectedRows: CombineShipItem[]) => {

    }

    const cancelShipmentInfo = () => {
        setUpdateOpen(false)
    }
    return (
        <Spin spinning={loading}>
            <div className={styles.pending_container}>
                <ShipOrderForm data={combinedData} action={pendingOrderOption}
                               checkbox={type === 'arranged'}
                               selectedAction={getSelectedOrder}
                               node={type === 'pending' ? ['Detail', 'Update'] : ['Detail']}
                               expectColumn={reference[type] ? ['carPlate', 'leavingTime'] : []}/>
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

            <UpdateShipInfo id={currentId.current} open={updateOpen} closeModal={cancelShipmentInfo} updateShipmentList={getCombinedData}/>
        </Spin>
    )
}
