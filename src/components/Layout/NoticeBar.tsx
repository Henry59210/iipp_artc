import React, {ReactElement, useState} from "react";
import styles from "./styles.module.css"
import {Button, message, Radio} from "antd";

export const NoticeBar = () => {
    return (
        <div className={styles.noticebar}>
            <div className={styles.noticebar_inline}>
                <MessageBox new={false}/>
                <MessageBox new={true}/>
                <MessageBox new={true}/>
            </div>
        </div>
    )
}

const MessageBox = (props: {new?: boolean}) => {
    const [display, setDisplay] = useState(false);
    setTimeout(() => setDisplay(true), 2000)

    // message.config({
    //     top: 100,
    //     duration: 2,
    //     maxCount: 3,
    //     rtl: true,
    //     prefixCls: 'my-message',
    // });
    return (
        <div className={props.new ? display ? `${styles.messagebox_init} ${styles.messagebox}` : styles.messagebox_init : styles.messagebox}>
            <div className={styles.messagebox_info}>From: customer</div>
            <div className={styles.messagebox_info}>Type: new order</div>
            <div className={styles.messagebox_operate}>
                <Button value="Detail" type={"link"} onClick={()=>{message.info('aaa')}}>Detail</Button>
                <Button value="OK" type={"link"}>OK</Button>
            </div>
        </div>
    )
}
