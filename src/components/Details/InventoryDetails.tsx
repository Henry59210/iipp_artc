import styles from "./styles.module.css"
import {useEffect} from "react";

export const InventoryDetails = (props: {id:string}) => {
    useEffect(()=>{

    })
    return (
        <div className={styles.inventory_container}>
            <div className={styles.inventory_container_title}>
                <div className={styles.inventory_container_title__country}>India</div>
                <div className={styles.inventory_container_title__info}>
                    <div className={styles.type}>type: <span>{}</span></div>
                    <div className={styles.status}>status: <span>{}</span></div>
                </div>
            </div>
            <div className={styles.inventory_container_content}></div>
        </div>
    )
}

