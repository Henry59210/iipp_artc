import styles from "@/components/Global/styles.module.css";
import React from "react";
import {productFormatConvert} from "@/utilities/usefulTools";


export const ItemText = (props: { title: string, value: string | number, unit?: 'PKG' | 'KG', perUnit?: string, bold?: boolean, actualUse?: number }) => {
    let unit
    if (props.unit === 'KG') {
        unit = 'KG'
    } else unit = 'PKG'
    return (
        <div className={styles.order_items_text}>
            <div className={styles.title} style={{fontWeight: props.bold ? 'bold' : ''}}>
                <span>{productFormatConvert(props.title).mainName}</span>
                <br/>
                <span style={{fontSize: '12px'}}>{productFormatConvert(props.title).specification}</span>
            </div>
            <div className={styles.value}>
                {props.actualUse !== undefined ?
                    <span className={styles.value_span}>{props.actualUse === null ? '-' : props.actualUse}</span> : ''}
                {props.value + ' ' + unit + (props.perUnit ? props.perUnit : '')}
            </div>
        </div>
    )
}
