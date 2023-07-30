import {Menu, MenuProps, Modal, Popover, Spin} from "antd";
import styles from "@/components/Details/styles.module.css";
import React, {useEffect, useRef, useState} from "react";
import {
    CombineProductOrderDetail, CombineShipOrderDetail,
    getProductionCombineDetail,
    getShipCombineOrderDetail,
    productRequiredListItem
} from "@/apis/order";
import {OrderForm} from "@/components/Global/OrderForm";
import {InventoryDetails} from "@/components/Details/InventoryDetails";
import {ItemText} from "@/components/Global/ItemText";
import {InfoCircleOutlined} from "@ant-design/icons";
import {StatusDetails} from "@/components/Details/StatusDetails";
import {useAppSelector} from "@/hooks";
import {selectRole} from "@/features/user/userSlice";
import commercial from "@/pages/workbench/commercial";

export const CombineOrderDetails = ({id, type}: { id: string, type: 'production' | 'shipment' }) => {
    const role = useAppSelector(selectRole)
    const [detailOpen, setDetailOpen] = useState(false);
    const [current, setCurrent] = useState('product');
    const [combineDetailData, setCombineDetailData] = useState<CombineProductOrderDetail | CombineShipOrderDetail>({
        id: "",
        materialRequiredList: [],
        orderList: [],
        productRequiredList: []
    })
    const currentOrderId = useRef('')

    const items: MenuProps['items'] = type === 'production' ? [
        {
            label: 'Product Info',
            key: 'product',
        },
        {
            label: role === 'commercial' ? 'Expect Material Info' : 'Material ( real | expected ) ',
            key: 'material',
        },
    ] : [{
        label: 'Product Info',
        key: 'product',
    }];

    useEffect(() => {
        //待修改getShipCombineOrderDetail数据类型
        (async () => {
            let res
            if(type === 'production') {
                res = await getProductionCombineDetail(id, role)
            } else {
                res = await getShipCombineOrderDetail(id)
            }
            if (res.data !== null) {
                setCombineDetailData(res.data)
            }
        })()
    }, [])
    const onClick: MenuProps['onClick'] = (e) => {
        setCurrent(e.key);
    };

    const getOrderDetail = (record: any) => {
        currentOrderId.current = record.id
        setDetailOpen(true)
    }

    const generateMaterialHint = (item: productRequiredListItem) => {
        return (
            <div style={{margin: 20}}>
                {item.materialRequiredList.map(item => <ItemText key={item.materialId}
                                                                 title={item.materialName}
                                                                 value={item.weight}
                                                                 unit={'KG'}/>
                )}
            </div>
        )
    }
    const generateSummaryItems = () => {
        if (current === 'product') {
            return combineDetailData.productRequiredList.map(item => {
                if (!item.materialRequiredList) return <div>empty</div>

                return (<div key={item.productId} style={{display: 'flex', alignItems: 'center'}}>
                    <ItemText
                              title={item.productName}
                              value={item.quantity}/>
                    <div style={{marginBottom: 15, marginLeft: 15}}>
                        <Popover content={generateMaterialHint(item)} title="Estimated materials consumption">
                            <InfoCircleOutlined style={{color: 'gray', cursor: 'pointer'}}/>
                        </Popover>
                    </div>
                </div>)
            })
        } else if(current === 'material') {
                return (combineDetailData as CombineProductOrderDetail).materialRequiredList.map(item => <ItemText key={item.materialId}
                                                                                   title={item.materialName}
                                                                                   value={item.weight}
                                                                                   actualUse={item.actualWeightUsed!}
                                                                                   unit={'KG'}/>)
        }
    }
    return (
        <Spin spinning={combineDetailData.id === ''}>
            <div className={styles.combine_details_container}>
                <div className={styles.orders_container}>
                    <OrderForm expectColumn={['id', 'expectedTime']} data={combineDetailData.orderList} checkbox={false} combine={false}
                               node={['Detail']}
                               action={getOrderDetail}></OrderForm>
                </div>
                <div className={styles.summary_container}>
                    <Menu className={styles.navbar} onClick={onClick} selectedKeys={[current]} mode="horizontal"
                          items={items}/>
                    <div className={styles.summary_content_container}>
                        <div className={styles.summary_items_container}>
                            {generateSummaryItems()}
                        </div>
                    </div>
                </div>
                <Modal
                    title="Inventory Details"
                    centered
                    destroyOnClose={true}
                    open={detailOpen}
                    footer={null}
                    onOk={() => setDetailOpen(false)}
                    onCancel={() => setDetailOpen(false)}
                    width={800}
                >
                    {type === 'production' ? <InventoryDetails id={currentOrderId.current}/>
                        : <StatusDetails orderInfo={
                            (combineDetailData as CombineShipOrderDetail).orderList.find(item=> item.id===currentOrderId.current)
                        }/>}
                </Modal>
            </div>
        </Spin>
    )
}
