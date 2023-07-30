import React, {ForwardedRef, forwardRef, ReactElement, useEffect, useRef, useState} from "react";
import styles from "./styles.module.css"
import {Button, message, Modal, Radio} from "antd";
import {noticeBarInfo, NotificationType} from "@/apis/socketApis";
import {useAppDispatch, useAppSelector} from "@/hooks";
import {removeHandled, selectReadList, setRead, setUpdate} from "@/features/notification/notificationSlice";
import {selectRole} from "@/features/user/userSlice";
import {readMessage} from "@/apis/notification";
import {MouseEvent} from 'react'
import {useRouter} from "next/router";
import {setLastWorkbenchTab, WorkbenchTabs} from "@/features/pageMemo/pageSlice";
import {CombineOrderDetails} from "@/components/Details/CombineOrderDetails";
import {confirmProductionOrder, confirmShipmentOrder} from "@/apis/order";

export const NoticeBar = ({infoArr}: { infoArr: Array<NotificationType> }) => {
    const [removeIndex, setRemoveIndex] = useState(-1)
    const [removeId, setRemoveId] = useState('')
    const [doesSthRemoved, setDoesSthRemoved] = useState(false)
    const role = useAppSelector(selectRole)
    const readList: { [key: string]: boolean } = useAppSelector(selectReadList)
    const msgBoxesRef = useRef<HTMLDivElement[]>([])
    const lastHeight = useRef(0)
    const lastNumber = useRef(-1)
    const [blockHeight, setBlockHeight] = useState(0)
    const dispatch = useAppDispatch()

    const getLastRef = () => {
        if (msgBoxesRef.current.length === 1 && msgBoxesRef.current[0] === null) return null
        for (let i = msgBoxesRef.current.length - 1; i >= 0; i--) {
            if (msgBoxesRef.current[i] !== null) return msgBoxesRef.current[i]
        }
        return null
    }
    //return 的函数没有括号
    useEffect(() => {
        const lastRef = getLastRef()
        if (lastRef !== null) {
            const handleAnimationEnd = () => {
                lastHeight.current = lastRef ? lastRef.offsetTop + 120 : 0
                console.log(msgBoxesRef)
                setBlockHeight(lastHeight.current)
                lastRef.removeEventListener('animationend', handleAnimationEnd)
            };
            if (lastRef.className.search('down_top') !== -1)
                lastRef.addEventListener('animationend', handleAnimationEnd);
            else handleAnimationEnd()
            return setListRead
        }
    }, [])

    useEffect(() => {
        setDoesSthRemoved(false)
        if (lastNumber.current < infoArr.length && lastNumber.current !== -1) {
            const lastRef = getLastRef()
            if (lastRef !== null) {
                const handleAnimationEnd = () => {
                    lastHeight.current = lastRef ? lastRef.offsetTop + 120 : 0
                    console.log(msgBoxesRef)
                    setBlockHeight(lastHeight.current)
                    lastRef.removeEventListener('animationend', handleAnimationEnd)
                };
                if (lastRef.className.search('down_top') !== -1)
                    lastRef.addEventListener('animationend', handleAnimationEnd);
                else handleAnimationEnd()
            }
        }
        return () => {
            lastNumber.current = infoArr.length
        }
    }, [infoArr.length])

    useEffect(() => {
        if (removeId !== '') {
            (function (removeId: string) {
                setTimeout(async () => {
                    await readMessage([removeId], role)
                }, 800)
            })(removeId)
            setDoesSthRemoved(true)
        }
    }, [removeId])


    const setListRead = () => {
        infoArr.forEach(item => {
            dispatch(setRead(item.id))
        })
    }

    const generateClassName = (id: string, currentIndex: number, removeIndex: number, isRemove: boolean) => {
        if (isRemove) {
            if (currentIndex === removeIndex) {
                return `${styles.messagebox} ${styles.remove}`
            } else if (currentIndex > removeIndex) {
                return `${styles.messagebox} ${styles.messagebox_cur_top}`
            } else return `${styles.messagebox}`
        } else {
            if (readList[id]) {
                return `${styles.messagebox}`
            } else {
                return `${styles.messagebox} ${styles.messagebox_down_top}`
            }
        }
    }

    const getRemoveIndex = (index: number, id: string) => {
        setListRead()
        setRemoveIndex(index)
        setRemoveId(id)
        dispatch(removeHandled(id))
    }

    return (
        <div className={styles.noticebar}>
            <div className={styles.noticebar_inline}>
                <div style={{height: blockHeight}}>
                    {infoArr.map((item, index) =>
                        <MessageBox ref={el => msgBoxesRef.current[index] = el}
                                    key={item.id} currentIndex={index}
                                    item={item}
                                    setClassName={generateClassName}
                                    remove={getRemoveIndex} removeIndex={removeIndex}
                                    doesSthRemoved={doesSthRemoved}/>)}
                </div>
            </div>
        </div>
    )
}


const MessageBox = forwardRef(({
                                   setClassName,
                                   item,
                                   currentIndex,
                                   doesSthRemoved,
                                   removeIndex,
                                   remove,
                               }: {
    ref: number, currentIndex: number, item: NotificationType, remove: (index: number, id:string)=>void, removeIndex: number, doesSthRemoved: boolean,
    setClassName: (id: string, currentIndex: number, removeIndex: number, isRemove: boolean) => string
}, ref: ForwardedRef<any>) => {
    const router = useRouter();
    const dispatch = useAppDispatch()
    const [isOkButton, setIsOkButton] = useState(true)
    const [isHandleButton, setIsHandleButton] = useState(true)
    const [orderType, setOrderType] = useState('')
    const [modalOpen, setModalOpen] = useState(false)
    const [modalContent, setModalContent] = useState<'production' | 'shipment'>('production')

    useEffect(() => {
        setButton()
    }, [])

    const statusForm: { [key: string]: number } = {
        'customer_commercial': 1,
        'commercial_production': 2,
        'commercial_shipment': 3,
        'production_commercial': 4,
        'shipment_commercial': 5
    }


    const setButton = () => {
        switch (statusForm[`${item.senderRole}_${item.receiverRole}`]) {
            //customer_commercial
            case 1:
                setIsOkButton(true)
                setIsHandleButton(true)
                setOrderType('New Order')
                break;
            //commercial_production
            case 2:
                setIsOkButton(false)
                setIsHandleButton(true)
                setOrderType('New Production Order')
                break;
            //commercial_shipment
            case 3:
                setIsOkButton(false)
                setIsHandleButton(true)
                setOrderType('New Shipment Order')
                break;
            //production_commercial
            case 4:
                setIsOkButton(true)
                setIsHandleButton(true)
                setOrderType('Produce Finished')
                break;
            //shipment_commercial
            case 5:
                setIsOkButton(true)
                setIsHandleButton(false)
                setOrderType('Order Shipped')
                break;
        }
    }

    const setHandleAction = async (e: MouseEvent) => {
        switch (statusForm[`${item.senderRole}_${item.receiverRole}`]) {
            //customer_commercial
            case 1:
                await readMessage([item.id], item.receiverRole)
                dispatch(removeHandled(item.id))
                if(router.pathname !== '/newOrder') {
                    await router.push('/newOrder')
                }
                break;
            //commercial_production
            case 2:
                e.stopPropagation()
                setModalContent('production')
                setModalOpen(true)
                break;
            //commercial_shipment
            case 3:
                e.stopPropagation()
                setModalContent('shipment')
                setModalOpen(true)
                break;
            //production_commercial
            case 4:
                await readMessage([item.id], item.receiverRole)
                dispatch(removeHandled(item.id))
                dispatch(setLastWorkbenchTab('shipment'))
                if(router.pathname !== '/workbench/commercial') {
                    await router.push('/workbench/commercial')
                }
                break;
            //shipment_commercial
            case 5:
                break;
        }
    }

    const confirmOrder = async () => {
        if(modalContent === 'production') {
            await confirmProductionOrder([item.orderId])
        } else {
            await confirmShipmentOrder([item.orderId])
        }
        setModalOpen(false)
        remove(currentIndex, item.id)
        dispatch(setUpdate(true))
    }
    const messageBoxAction = async (e: MouseEvent, buttonText: string) => {
        if (buttonText === 'OK') {
            remove(currentIndex, item.id)
            dispatch(setUpdate(true))
        } else if (buttonText === 'Handle') {
            await setHandleAction(e)
        }
    }
    return (
        <div ref={ref}
             className={setClassName(item.id, currentIndex, removeIndex, doesSthRemoved)}>
            <div className={styles.messagebox_info}>From: <span style={{fontWeight: "normal"}}>{item.senderRole}</span></div>
            <div className={styles.messagebox_info}>Type: <span style={{fontWeight: "normal"}}>{orderType}</span></div>
            <div className={styles.messagebox_operate}
                 onClick={(e) => messageBoxAction(e, (e.target as HTMLElement).innerHTML)}>
                {isOkButton ? <Button type={"link"}>OK</Button> : null}
                {isHandleButton ? <Button type={"link"}>Handle</Button> : null}
            </div>
            <Modal
                title="Combo Order Detail"
                centered
                open={modalOpen}
                okText={'confirm'}
                onOk={confirmOrder}
                onCancel={() => setModalOpen(false)}
                width={1200}
            >
                <CombineOrderDetails id={item.orderId} type={modalContent}/>
            </Modal>
        </div>
    )
})
