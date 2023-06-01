import styles from "@/components/Global/styles.module.css";
import React from "react";

export const ItemText = (props:{title: string, value: string|number}) => {
    return (
        <div className={styles.order_items_text}>
            <div className={styles.title}>{props.title}</div>
            <div className={styles.value}>{props.value}</div>
        </div>
    )
}
