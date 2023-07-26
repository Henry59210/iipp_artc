import React, {ReactElement, useEffect, useRef, useState} from "react";
import styles from "./styles.module.css"
import {Button, message, Radio} from "antd";
import {noticeBarInfo, NotificationType} from "@/apis/socketApis";
import {useAppDispatch, useAppSelector} from "@/hooks";
import {selectReadList, setRead} from "@/features/notification/notificationSlice";
import {selectRole} from "@/features/user/userSlice";

export const NoticeBar = ({infoArr}: { infoArr: Array<NotificationType> }) => {
    const [isReadList, setIsReadList] = useState<{ readInfo: NotificationType[], unreadInfo: NotificationType[] }>({
        readInfo: [],
        unreadInfo: []
    })
    const role = useAppSelector(selectRole)
    const readList: { [key: string]: boolean } = useAppSelector(selectReadList)
    const dispatch = useAppDispatch()

    useEffect(() => {
        generateReadList()
    }, [infoArr.length])

    useEffect(() => {
        return setListRead()
    }, [])


    const setListRead = () => {
        infoArr.forEach(item => {
            dispatch(setRead(item.id))
        })
    }

    const generateReadList = () => {
        const readInfo: NotificationType[] = []
        const unreadInfo: NotificationType[] = []
        infoArr.forEach(item => {
            readList[item.id] ? readInfo.push(item) : unreadInfo.push(item)
        })
        setIsReadList({
            readInfo,
            unreadInfo
        })
        return {
            readInfo,
            unreadInfo
        }
    }

    const messageBoxAction = (from: string, receive: string, item: string) => {
        if (item === 'OK') {
            setRemove(true)
        } else if (item === 'Handle') {

        }
    }

    return (
        <div className={styles.noticebar}>
            <div className={styles.noticebar_inline}>
                {isReadList.readInfo.map(item => <MessageBox key={item.id} isNew={false} from={item.senderRole}
                                                             receive={item.receiverRole}/>)}
                {isReadList.unreadInfo.map(item => <MessageBox key={item.id} isNew={true} from={item.senderRole}
                                                               receive={item.receiverRole}/>)}
            </div>
        </div>
    )
}

const MessageBox = ({isNew, from, receive, className, messageBoxAction}: { isNew?: Boolean, from: string, receive: string, className: string, messageBoxAction: Function}) => {
    const [display, setDisplay] = useState(false);
    const [remove, setRemove] = useState(false)
    const [isOkButton, setIsOkButton] = useState(true)
    const [isHandleButton, setIsHandleButton] = useState(true)
    useEffect(() => {
        setDisplay(true)
    }, [])

    useEffect(() => {
        if (from === 'shipment' && receive === 'commercial') {
            setIsHandleButton(false)
        }
        if (from === 'commercial' && (receive === 'Production' || receive === 'Shipment')) {
            setIsOkButton(false)
        }
    })

    const generateClassName = ()=>{
        if(isNew) {
            if(display) {
                if(remove) {
                    return `${styles.messagebox} ${styles.messagebox_leave}`
                }
                return `${styles.messagebox_init} ${styles.messagebox}`
            } else return `${styles.messagebox_init}`
        } else return `${styles.messagebox}`
    }
    return (
        <div
            className={className}>
            <div className={styles.messagebox_info}>From: {from}</div>
            <div className={styles.messagebox_info}>Type: new order</div>
            <div className={styles.messagebox_operate}
                 onClick={(e) => messageBoxAction(from, receive, (e.target as HTMLElement).innerHTML)}>
                {isOkButton ? <Button type={"link"}>OK</Button> : null}
                {isHandleButton ? <Button type={"link"}>Handle</Button> : null}
            </div>
        </div>
    )
}
