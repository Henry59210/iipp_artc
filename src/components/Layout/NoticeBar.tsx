import React, {ReactElement, useEffect, useRef, useState} from "react";
import styles from "./styles.module.css"
import {Button, message, Radio} from "antd";
import {noticeBarInfo, NotificationType} from "@/apis/socketApis";
import {useAppSelector} from "@/hooks";
import {selectRole, selectUserId} from "@/features/user/userSlice";
import {getToken} from "@/network/auth";

export const NoticeBar = ({infoArr}: { infoArr: Array<NotificationType> }) => {
    const [isReadList, setIsReadList] = useState<{ readInfo: NotificationType[], unreadInfo: NotificationType[] }>({
        readInfo: [],
        unreadInfo: []
    })
    const socketCallBack = (data: any) => {
        console.log(data)
    }
    useEffect(()=>{
        console.log('aaa')
    },[])
    useEffect(() => {
        const res = isRead()

    }, [infoArr.length])

    const isRead = () => {
        const readInfo: NotificationType[] = []
        const unreadInfo: NotificationType[] = []
        infoArr.forEach(item => {
            item.readFlag ? readInfo.push(item) : unreadInfo.push(item)
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
    return (
        <div className={styles.noticebar}>
            <div className={styles.noticebar_inline}>
                { isReadList.readInfo.map(item => <MessageBox key={item.id} new={false}/>) }
                { isReadList.unreadInfo.map(item=><MessageBox key={item.id} new={true}/>) }
            </div>
        </div>
    )
}

const MessageBox = (props: { new?: boolean }) => {
    const [display, setDisplay] = useState(false);
    useEffect(()=>{
        setDisplay(true)
    },[])

    return (
        <div
            className={props.new ? display ? `${styles.messagebox_init} ${styles.messagebox}` : styles.messagebox_init : styles.messagebox}>
            <div className={styles.messagebox_info}>From: customer</div>
            <div className={styles.messagebox_info}>Type: new order</div>
            <div className={styles.messagebox_operate}>
                <Button value="OK" type={"link"}>OK</Button>
                <Button value="Handle" type={"link"} onClick={() => {
                    message.info('aaa')
                }}>Detail</Button>
            </div>
        </div>
    )
}
