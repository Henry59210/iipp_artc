import React, {useEffect, useLayoutEffect, useRef, useState} from "react";
import styles from "./styles.module.css"
import {Button, Modal, Typography} from "antd";
import CountUp from 'react-countup';
import {AllHistory, getAllMaterialHistory, getAllProductHistory, HistoryList} from "@/apis/inventory";

const {Text} = Typography;
import dynamic from "next/dynamic";
import {LineConfig} from "@ant-design/plots/es/components/line";
import {dateConvert} from "@/utilities/usefulTools";
import {
    MaterialInventory,
    ProductInventory,
    realTimeMaterialInventory,
    realTimeProductInventory
} from "@/apis/socketApis";
import {websocketAPI, WebSocketAPIMethods} from "@/network/webSocket";
import {Loading} from "@/components/Global/Loading";

const Line = dynamic(() => import('@ant-design/plots').then(({Line}) => Line), {ssr: false});

type InventoryBoxProps = {
    historyList: HistoryList;
} & (ProductInventory | MaterialInventory)

type InventoryProps = {
    type: 'product' | 'raw'
}

//等数据变更了要改，当前处理的single值
const transferDate = (data: AllHistory) => {
    for (let i in data) {
        data[i].forEach((item) => {
            item.recordTime = dateConvert(item.recordTime, ['MM', '-', 'DD'])
        })
    }
}

export const Inventory: React.FC<InventoryProps> = (inventoryProps: InventoryProps) => {
    const allHistory = useRef<AllHistory>({})
    const [inventoryBoxList, setInventoryBoxList] = useState<InventoryBoxProps[]>([]);
    const [materialSocket, setMaterialSocket] = useState(realTimeMaterialInventory())
    const [productSocket, setProductSocket] = useState(realTimeProductInventory())

    const isConnect = ():boolean =>{
        if(inventoryProps.type === 'raw') return materialSocket.connectStatus()
        else return productSocket.connectStatus()
    }
    const generateMaterialList = (data: MaterialInventory[]) => {
        if(typeof data==="object") {
            const arr: InventoryBoxProps[] = data.map(item => ({
                ...item,
                historyList: allHistory.current[item.materialName],
            }));
            setInventoryBoxList(arr)
        }
    }

    const generateProductList = (data: ProductInventory[]) => {
        if(typeof data==="object") {
            const arr: InventoryBoxProps[] = data.map(item => ({
                ...item,
                historyList: allHistory.current[item.productName],
            }));
            setInventoryBoxList(arr)
        }
    }

    useEffect(() => {
        switch (inventoryProps.type) {
            case 'product':
                (async () => {
                    const res = await getAllProductHistory()
                    if (res.data !== null) {
                        transferDate(res.data)
                        allHistory.current = res.data
                    }
                    productSocket.initWebSocket(generateProductList)
                })()
                break;
            case 'raw':
                (async () => {
                    const res = await getAllMaterialHistory()
                    if (res.data !== null) {
                        transferDate(res.data)
                        allHistory.current = res.data
                    }
                    materialSocket.initWebSocket(generateMaterialList)
                })()
                break;
        }
        return () => {
            inventoryProps.type === 'raw' ?  materialSocket.closeWebSocket() : productSocket.closeWebSocket()
        }
    }, [])

    return isConnect() ? (
        <div className={styles.inventory_container}>
            <div className={styles.container_title}>
                <span>{inventoryProps.type === 'raw' ? 'Raw Material: ' : 'Product: '}</span>
            </div>
            {
                inventoryBoxList.map((item,index) => (
                    <InventoryBox key={index} boxInfo={item} type={inventoryProps.type}/>))
            }
        </div>
    ) : <Loading/>
}

const InventoryBox = ({boxInfo, type}:{boxInfo:InventoryBoxProps, type:string}) => {
    const [modalOpen, setModalOpen] = useState(false);
    let weight = 0
    let quantities = 0
    let name = ''
    let historyList:HistoryList = []
    if(type === 'raw'){
        const {materialName, unreservedWeight} = boxInfo as ({historyList: HistoryList} & MaterialInventory)
        name = materialName
        weight = unreservedWeight
        historyList = boxInfo.historyList
    } else if (type === 'product') {
        const {productName, unreservedQuantity} = boxInfo as ({historyList: HistoryList} & ProductInventory)
        name = productName
        quantities = unreservedQuantity
        historyList = boxInfo.historyList
    }
    const nameProcess = (name: string) => {
        return type === 'raw' ? name + ' / kg' : name + ' / pkg'
    }
    const formatter = (value: any) => <CountUp end={value} separator=","/>;
    return (
        <>
            <div className={styles.inventory_box}>
                <div className={styles.inventory_box_title}>
                    <Text>{nameProcess(name)}</Text>
                    <Button type={"link"} onClick={() => setModalOpen(true)}>Detail</Button>
                </div>
                <div className={styles.inventory_box_container}>
                    <div className={styles.inventory_box__data}>
                        <Text type="secondary">Current: </Text>
                        <Text> {formatter(type === 'raw' ? weight : quantities)}</Text>
                    </div>
                    <div className={styles.inventory_box__chart}>
                        <HistoryLine {...{data: historyList, type, isThumbnail: true}}/>
                    </div>
                </div>
            </div>
            <Modal
                title={nameProcess(name)}
                centered
                width={1000}
                open={modalOpen}
                onOk={() => setModalOpen(false)}
                onCancel={() => setModalOpen(false)}
            >
                <div className={styles.inventory_box_modal__content}>
                    <HistoryLine {...{data: historyList, type, isThumbnail: false}}/>
                </div>
            </Modal>
        </>

    )
}


const HistoryLine = ({data, type, isThumbnail}: { data: HistoryList, type: string, isThumbnail: boolean }) => {
    const originConfig: LineConfig = {
        data,
        padding: 'auto',
        appendPadding: [10, 10, 10, 10],
        xField: 'recordTime',
        yField: type === 'raw' ? 'weight' : 'quantity',
        autoFit: true,
        xAxis: {
            // type: 'timeCat',
            tickCount: isThumbnail ? 3 : 30,
        },
    };
    const point = {
        size: 5,
        shape: 'diamond',
        style: {
            fill: 'white',
            stroke: '#5B8FF9',
            lineWidth: 2,
        },
    }
    const slider = {
        start: 0,
        end: 1,
    }
    const config: LineConfig = isThumbnail ? originConfig : {...originConfig, point, slider}
    return <Line {...config} />;
};

