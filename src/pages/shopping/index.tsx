import {getLayout} from "@/components/Layout";
import {NextPageWithLayout} from "@/pages/_app";
import styles from "@/styles/shopping.module.css"
import {ProductInfo} from "@/apis/order";
import {getProductInventory, ProductInventoryInfo} from "@/apis/inventory";
import {ProductItem} from "@/components/Shopping/ProductItem";
import {CartItemType, getCartList, submitOrder, updateCart} from "@/apis/customer";
import {useEffect, useRef, useState} from "react";
import {CartItem} from "@/components/Shopping/CartItem";
import {Button, Checkbox, DatePicker, DatePickerProps, message, Modal, Spin} from "antd";

import dayjs, {Dayjs} from "dayjs";
import {RangePickerProps} from "antd/es/date-picker";
import customParseFormat from 'dayjs/plugin/customParseFormat';


const testData: ProductInventoryInfo[] = [
    {
        createTime: 'string',
        createUser: 'string',
        id: '1234567891',
        productName: 'MIX CHOC DRINK KR 560G 16/CS',
        productTypeId: '11111111',
        quantity: 300,
        unreservedQuantity: 200,
        updateTime: 'string',
        updateUser: 'string',
    },
    {
        createTime: 'string',
        createUser: 'string',
        id: '1234567892',
        productName: 'MIX CHOC DRINK KR 560G 16/CS',
        productTypeId: '11111111',
        quantity: 300,
        unreservedQuantity: 200,
        updateTime: 'string',
        updateUser: 'string',
    },
    {
        createTime: 'string',
        createUser: 'string',
        id: '1234567893',
        productName: 'MIX CHOC DRINK KR 560G 16/CS',
        productTypeId: '11111111',
        quantity: 300,
        unreservedQuantity: 200,
        updateTime: 'string',
        updateUser: 'string',
    },
    {
        createTime: 'string',
        createUser: 'string',
        id: '1234567894',
        productName: 'MIX CHOC DRINK KR 560G 16/CS',
        productTypeId: '11111111',
        quantity: 300,
        unreservedQuantity: 200,
        updateTime: 'string',
        updateUser: 'string',
    },
    {
        createTime: 'string',
        createUser: 'string',
        id: '1234567895',
        productName: 'MIX CHOC DRINK KR 560G 16/CS',
        productTypeId: '11111111',
        quantity: 300,
        unreservedQuantity: 200,
        updateTime: 'string',
        updateUser: 'string',
    },
    {
        createTime: 'string',
        createUser: 'string',
        id: '1234567896',
        productName: 'MIX CHOC DRINK KR 560G 16/CS',
        productTypeId: '11111111',
        quantity: 300,
        unreservedQuantity: 200,
        updateTime: 'string',
        updateUser: 'string',
    },
    {
        createTime: 'string',
        createUser: 'string',
        id: '1234567897',
        productName: 'MIX CHOC DRINK KR 560G 16/CS',
        productTypeId: '11111111',
        quantity: 300,
        unreservedQuantity: 200,
        updateTime: 'string',
        updateUser: 'string',
    }
]
const cartData: ProductInfo[] = [
    {
        id: '',
        productName: '',
        quantity: 20
    }, {
        id: '',
        productName: '',
        quantity: 20
    }, {
        id: '',
        productName: '',
        quantity: 20
    }, {
        id: '',
        productName: '',
        quantity: 20
    }, {
        id: '',
        productName: '',
        quantity: 20
    },
]
const CheckboxGroup = Checkbox.Group;


const shoppingCartHint = 'Shopping Cart: '
const productListHint = 'Products:'
const {RangePicker} = DatePicker;
dayjs.extend(customParseFormat);

const Shopping: NextPageWithLayout = () => {
    const [productList, setProductList] = useState<ProductInventoryInfo[]>([])
    //购物车列表
    const [cartList, setCartList] = useState<CartItemType[]>([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const cartListCache = useRef<{ [key: string]: number }>({})
    //更新购物车的列表请求body
    const updatedCartList = useRef<{ id: string, quantity: number }[]>([])
    const selectedList = useRef<CartItemType[]>([])
    const expectedDate = useRef<(string)>('')
    const [hasExpectedDate, setHasExpectedDate] = useState(false)
    const [editable, setEditable] = useState(false)
    const [hasSelected, setHasSelected] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const range = (start: number, end: number) => {
        const result = [];
        for (let i = start; i < end; i++) {
            result.push(i);
        }
        return result;
    };

    useEffect(() => {
        (async function () {
            await updateList()
        })()
    }, [])

    const updateList = async () => {
        await getProductList()
        await getCartListInfo()
    }
    const getProductList = async () => {
        const res = await getProductInventory()
        if (res.data !== null) {
            setProductList(res.data)
        }
    }
    const getCartListInfo = async () => {
        setIsLoading(true)
        const res = await getCartList()
        if (res.data !== null) {
            setCartList(res.data)
            console.log('aaa')
            res.data.forEach(item => {
                cartListCache.current[item.id] = item.quantity
            })
            setIsLoading(false)
        }

    }
    //更新购物车数量
    const updateCartList = (id: string, quantity: number) => {
        //数字没变，也为空
        let isUpdate = false
        for (let [index, item] of updatedCartList.current.entries()) {
            if (item.id === id) {
                item.quantity = quantity
                if (item.quantity === cartListCache.current[id]) {
                    updatedCartList.current.splice(index, 1)
                }
                isUpdate = true
                break;
            }
        }
        if (!isUpdate) {
            updatedCartList.current.push({id, quantity})
        }
    }
    const selectItem = (checked: boolean, cartItem: CartItemType) => {
        if (checked) {
            selectedList.current.push(cartItem)
        } else {
            selectedList.current.map((item, index) => {
                if (item.id === cartItem.id) {
                    selectedList.current.splice(index, 1)
                    return
                }
            })
        }
        setHasSelected(Boolean(selectedList.current.length))
    }
    const removeItem = () => {
        let arr = [...cartList]
        selectedList.current.forEach(selectedItem => {
            let hasSelected = false
            for (let item of updatedCartList.current) {
                if (item.id === selectedItem.id) {
                    hasSelected = true
                    item.quantity = 0
                    break
                }
            }
            if (!hasSelected) {
                updatedCartList.current.push({id: selectedItem.id, quantity: 0})
            }
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].id === selectedItem.id) {
                    arr.splice(i, 1)
                    break
                }
            }
        })
        setCartList(arr)
    }
    const confirmEdit = async () => {
        if (updatedCartList.current.length) {
            const res = await updateCart(updatedCartList.current)
            if (res.code === '200') {
                message.success('Shopping Cart Updated')
            }
        }
        await cancelEdit()
    }
    const cancelEdit = async () => {
        setEditable(false)
        setHasSelected(false)
        updatedCartList.current = []
        selectedList.current = []
        await getCartListInfo()
    }
    const submitCartList = () => {
        expectedDate.current = ''
        setIsModalOpen(true);
    }
    const placeOrder = async () => {
        const obj = {
            productList: cartList,
            expectedTime: expectedDate.current
        }
        await submitOrder(obj)
        await updateList()
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setHasExpectedDate(false)
        expectedDate.current = ''
    };
    const onChange: DatePickerProps["onChange"] = (date) => {
        if (date) {
            expectedDate.current = date.format('YYYY-MM-DDT00:00:00')
            setHasExpectedDate(true)
        } else {
            expectedDate.current = ''
            setHasExpectedDate(false)
        }
    };

    const disabledDate: RangePickerProps['disabledDate'] = (current) => {
        // Can not select days before today and today
        return current && current < dayjs().startOf('day');
    };


    return (
        <div className={styles.container}>
            {/*Product List*/}
            <div className={styles.product_list}>
                <div className={styles.list__title}>{productListHint}</div>
                {productList.map(item => <ProductItem key={item.id} {...item} editable={editable}
                                                      updateCart={updateList}/>)}
            </div>
            {/*Cart List*/}
            <div className={styles.cart_list}>
                <div className={styles.list__title}>{shoppingCartHint}
                    <Button type="link" onClick={async () => {
                        if (!editable) setEditable(true)
                        else await cancelEdit()
                    }}>Edit</Button>
                </div>
                <Spin spinning={isLoading}>
                    {cartList.map(item => (
                        <div key={item.id} className={editable ? styles.cart_item_editable : ''}>
                            {editable ? <Checkbox onChange={(e) => selectItem(e.target.checked, item)}/> : null}
                            <div className={styles.cart_item_info_editable}>
                                <CartItem {...item} editable={editable} updateCart={updateCartList}/>
                            </div>
                        </div>
                    ))}
                </Spin>
                <div className={styles.cart_submit_container}>
                    {editable ?
                        (<>
                            <Button disabled={!hasSelected}
                                    style={{marginRight: 20}}
                                    onClick={removeItem}>Remove</Button>
                            <Button type={"primary"}
                                    style={{marginRight: 20}}
                                    onClick={() => confirmEdit()}>Done</Button>
                            <Button onClick={cancelEdit}>Cancel</Button>
                        </>) : <Button type={"primary"} onClick={submitCartList}>Submit</Button>}
                </div>
            </div>
            <Modal title="Expect Date"
                   centered
                   width={700}
                   open={isModalOpen}
                   destroyOnClose={true}
                   okText={'Order'}
                   onOk={() => hasExpectedDate ? placeOrder() : message.warning('Please choose date first')}
                   onCancel={handleCancel}>
                <div className={styles.modal_container}>
                    <div className={styles.modal_container__hint}>Please choose your expect date:</div>
                    <DatePicker
                        style={{width: 200, height: 40}}
                        disabledDate={disabledDate}
                        onChange={onChange}/>
                </div>
            </Modal>
        </div>
    )
}

export default Shopping

Shopping.getLayout = getLayout
