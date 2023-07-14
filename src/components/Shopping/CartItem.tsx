import styles from './styles.module.css'
import {ProductInventoryInfo} from "@/apis/inventory";
import {Button, InputNumber, message} from "antd";
import {CopyOutlined, ShoppingCartOutlined} from "@ant-design/icons";
import {productFormatConvert} from "@/utilities/usefulTools";
import { CartItemType, getCartList, submitItemToShopCart} from "@/apis/customer";
import {memo, useEffect, useRef, useState} from "react";

export const CartItem = ({id, productId, productName, quantity, updateCart, editable}: CartItemType & {
    updateCart: (id:string, value:number)=>void,
    editable: boolean
}) => {
    const copyId = () => {
        navigator.clipboard.writeText(productId).then(r => {
            message.success('Already copied ID')
        })
    }
    return (
        <div className={styles.product_item_container}>
            <span className={styles.product_id} style={{fontWeight: "bold"}}>PRODUCT ID: </span>
            <span className={styles.product_id}>{productId} <CopyOutlined style={{marginLeft: 5, fontSize: 11}}
                                                                              onClick={copyId}/></span>
            <div className={styles.product_item_content}>
                <div className={styles.product_item_detail}>
                    <div className={styles.product_item_detail__name}>
                        <span style={{
                            fontWeight: 'bolder',
                            whiteSpace: 'nowrap'
                        }}>{productFormatConvert(productName).mainName}</span>
                        <br/>
                        <span style={{
                            whiteSpace: 'nowrap'
                        }}>{productFormatConvert(productName).specification}</span>
                    </div>

                </div>
                <div className={styles.cart_item_action}>
                    <div className={styles.cart_item_action__hint}>Current Quantity: </div>
                    <InputNumber className={styles.cart_item_action__quantity}
                                 defaultValue={quantity}
                                 key={quantity}
                                 readOnly={!editable}
                                 min={0}
                                 formatter={(value) => `${value}\xa0\xa0PKG`}
                                 parser={(value) => Number(value!.replace('\xa0\xa0PKG', '')) as 1}
                                 onChange={(value) => {
                                     updateCart(id, value!)
                                 }}/>
                </div>
            </div>
        </div>
    )

}
