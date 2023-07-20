import styles from './styles.module.css'
import {ProductInventoryInfo} from "@/apis/inventory";
import {Button, InputNumber, message} from "antd";
import {CopyOutlined, ShoppingCartOutlined} from "@ant-design/icons";
import {productFormatConvert} from "@/utilities/usefulTools";
import {getCartList, submitItemToShopCart} from "@/apis/customer";
import {useRef} from "react";

export const ProductItem = ({productTypeId, productName, unreservedQuantity,editable, updateCart}: ProductInventoryInfo & {
    updateCart: () => void;
    editable: boolean
}) => {
    const quantity = useRef(1)
    const copyId = () => {
        navigator.clipboard.writeText(productTypeId).then(r => {
            message.success('Already copied ID')
        })
    }
    const submitToShoppingCart = async () => {
        await submitItemToShopCart({productId: productTypeId, quantity: quantity.current, productName: productName})
        await updateCart()
    }
    return (
        <div className={styles.product_item_container}>
            <span className={styles.product_id} style={{fontWeight: "bold"}}>PRODUCT ID: </span>
            <span className={styles.product_id}>{productTypeId} <CopyOutlined style={{marginLeft: 5, fontSize: 11}}
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
                    <div className={styles.product_item_detail__inventory}>
                        {'Inventory: ' + unreservedQuantity}
                    </div>
                </div>
                <div className={styles.product_item_action}>
                    <InputNumber className={styles.product_item_action__quantity}
                                 defaultValue={1}
                                 min={1}
                                 formatter={(value) => `${value}\xa0\xa0PKG`}
                                 parser={(value) => Number(value!.replace('\xa0\xa0PKG', '')) as 1}
                                 onChange={(value) => {
                                     quantity.current = value!
                                 }}/>
                    <div className={`${styles.product_item_action__cart_btn} ${editable ? styles.disable_btn : ''}`}
                         onClick={()=>!editable ? submitToShoppingCart() : ''}>
                        <ShoppingCartOutlined className={styles.cart_btn_icon}
                                              style={editable?{cursor: 'not-allowed'}: {}}
                                              />
                    </div>
                </div>
            </div>
        </div>
    )

}
