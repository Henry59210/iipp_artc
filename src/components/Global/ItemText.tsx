import styles from "@/components/Global/styles.module.css";
import React from "react";
import {productFormatConvert} from "@/utilities/usefulTools";


export const ItemText = (props:{title: string, value: string|number, unit?: 'PKG' | 'KG'}) => {
    let unit
    if(props.unit === 'KG') {
        unit = 'KG'
    } else unit = 'PKG'
    return (
        <div className={styles.order_items_text}>
            <div className={styles.title}>
                <span>{productFormatConvert(props.title).mainName}</span>
                <br/>
                <span style={{fontSize:'12px'}}>{productFormatConvert(props.title).specification}</span>
            </div>
            <div className={styles.value}>{props.value + ' ' +unit }</div>
        </div>
    )
}
