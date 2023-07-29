import React, {ForwardedRef, forwardRef, ReactElement, useEffect, useRef, useState} from "react";
import styles from "./styles.module.css"
import {Button, message, Radio} from "antd";
import {noticeBarInfo, NotificationType} from "@/apis/socketApis";
import {useAppDispatch, useAppSelector} from "@/hooks";
import {removeHandled, selectReadList, setRead} from "@/features/notification/notificationSlice";
import {selectRole} from "@/features/user/userSlice";
import {readMessage} from "@/apis/notification";

export const NoticeBar = ({infoArr}: { infoArr: Array<NotificationType> }) => {
    const [removeIndex, setRemoveIndex] = useState(-1)
    const [removeId, setRemoveId] = useState('')
    const [lastRemoveId, setLastRemoveId] = useState('')
    const [doesSthRemoved, setDoesSthRemoved] = useState(false)
    const role = useAppSelector(selectRole)
    const readList: { [key: string]: boolean } = useAppSelector(selectReadList)
    const msgBoxesRef = useRef<HTMLDivElement[]>([])
    const lastHeight = useRef(0)
    const lastNumber = useRef(-1)
    const [blockHeight, setBlockHeight] = useState(0)
    const dispatch = useAppDispatch()

    const getLastRef = () => {
        if(msgBoxesRef.current.length === 1 && msgBoxesRef.current[0] === null) return null
        for(let i = msgBoxesRef.current.length-1; i >= 0; i--) {
            if(msgBoxesRef.current[i] !== null) return msgBoxesRef.current[i]
        }
        return null
    }
    //return 的函数没有括号
    useEffect(() => {
        const lastRef = getLastRef()
        if(lastRef !== null) {
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
        if(lastNumber.current < infoArr.length && lastNumber.current !== -1) {
            const lastRef = getLastRef()
            if(lastRef !== null) {
                const handleAnimationEnd = () => {
                    lastHeight.current = lastRef ? lastRef.offsetTop + 120  : 0
                    console.log(msgBoxesRef)
                    setBlockHeight(lastHeight.current )
                    lastRef.removeEventListener('animationend', handleAnimationEnd)
                };
                if(lastRef.className.search('down_top') !== -1)
                    lastRef.addEventListener('animationend', handleAnimationEnd);
                else  handleAnimationEnd()
            }
        }
        return ()=>{lastNumber.current = infoArr.length}
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
                <div style={{height:  blockHeight }}>
                    {infoArr.map((item, index) =>
                        <MessageBox ref={el => msgBoxesRef.current[index] = el} key={item.id} currentIndex={index} setClassName={generateClassName} id={item.id}
                                    remove={getRemoveIndex} removeIndex={removeIndex}
                                    doesSthRemoved={doesSthRemoved}/>)}
                </div>
            </div>
        </div>
    )
}


const MessageBox = forwardRef(({
                        setClassName,
                        id,
                        currentIndex,
                        doesSthRemoved,
                        removeIndex,
                        remove,
                    }: {
    ref:number, id: string, currentIndex: number, remove: Function, removeIndex: number, doesSthRemoved: boolean,
    setClassName: (id: string, currentIndex: number, removeIndex: number, isRemove: boolean) => string
}, ref: ForwardedRef<any>) => {
    const [isOkButton, setIsOkButton] = useState(true)
    const [isHandleButton, setIsHandleButton] = useState(true)

    const messageBoxAction = async (item: string) => {

        if (item === 'OK') {

            // await readMessage([id], role)
        } else if (item === 'Handle') {

        }
        remove(currentIndex, id)
    }
    return (
        <div ref={ref}
             className={setClassName(id, currentIndex, removeIndex, doesSthRemoved)}>
            <div className={styles.messagebox_info}>From: {id}</div>
            <div className={styles.messagebox_info}>Type: {currentIndex}</div>
            <div className={styles.messagebox_operate}
                 onClick={(e) => messageBoxAction((e.target as HTMLElement).innerHTML)}>
                {isOkButton ? <Button type={"link"}>OK</Button> : null}
                {isHandleButton ? <Button type={"link"}>Handle</Button> : null}
            </div>
        </div>
    )
})
