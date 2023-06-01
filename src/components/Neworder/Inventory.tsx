import React, {useEffect, useState} from "react";
import styles from "./styles.module.css"
import {Button, Modal, Typography} from "antd";
import CountUp from 'react-countup';
import {getAllMaterialHistory, getAllProductHistory, HistoryList} from "@/apis/inventory";

const {Text} = Typography;
import dynamic from "next/dynamic";
import {LineConfig} from "@ant-design/plots/es/components/line";
import {dateConvert} from "@/utilities/usefulTools";

const Line = dynamic(() => import('@ant-design/plots').then(({Line}) => Line), {ssr: false});

type InventoryBoxProps = {
    quantities?: number,
    weight?: number
    historyList: HistoryList
}

type InventoryProps = {
    type: 'product' | 'raw'
}

//等数据变更了要改，当前处理的single值
const transferDate = (res: InventoryBoxProps) => {
    res.historyList.forEach((item) => {
        item.recordTime = dateConvert(item.recordTime, ['MM', '-', 'DD'])
    })
}

export const Inventory: React.FC<InventoryProps> = (inventoryProps: InventoryProps) => {
    const [allHistory, setAllHistory] = useState<InventoryBoxProps>({quantities: 0, historyList: []});
    // useEffect(()=>{
    //     switch (inventoryProps.type) {
    //         case 'product':
    //             (async ()=>{
    //                 const res = await getAllProductHistory()
    //                 transferDate(res)
    //                 setAllProductHistory(res)
    //             })()
    //             break;
    //         case 'raw':
    //             (async ()=>{
    //                 const res = await getAllMaterialHistory()
    //                 transferDate(res)
    //                 setAllRawHistory(res)
    //             })()
    //             break;
    //     }
    // }, [])
    useEffect(() => {
        let res: InventoryBoxProps = {quantities: 0, historyList: []}
        switch (inventoryProps.type) {
            case 'product':
                res = {
                    quantities: 10000,
                    historyList: [
                        {recordTime: "2023-03-07T00:00:00", quantities: 1000},
                        {recordTime: '2023-03-08T00:00:00', quantities: 2000},
                        {recordTime: '2023-03-09T00:00:00', quantities: 3000},
                        {recordTime: '2023-03-10T00:00:00', quantities: 4000},
                        {recordTime: '2023-03-11T00:00:00', quantities: 3000},
                        {recordTime: '2023-03-12T00:00:00', quantities: 5000},
                        {recordTime: '2023-03-13T00:00:00', quantities: 2000},
                        {recordTime: '2023-03-14T00:00:00', quantities: 8000},
                        {recordTime: '2023-03-15T00:00:00', quantities: 4000},
                        {recordTime: '2023-03-16T00:00:00', quantities: 6000},
                        {recordTime: '2023-03-17T00:00:00', quantities: 3000},
                        {recordTime: '2023-03-18T00:00:00', quantities: 6000},
                        {recordTime: '2023-03-19T00:00:00', quantities: 6000},
                        {recordTime: '2023-03-20T00:00:00', quantities: 2000},
                        {recordTime: '2023-03-21T00:00:00', quantities: 2000},
                        {recordTime: '2023-03-22T00:00:00', quantities: 5000},
                        {recordTime: '2023-03-23T00:00:00', quantities: 6000},
                        {recordTime: '2023-03-24T00:00:00', quantities: 5000},
                        {recordTime: '2023-03-25T00:00:00', quantities: 3000},
                        {recordTime: '2023-03-26T00:00:00', quantities: 2000},
                        {recordTime: '2023-03-27T00:00:00', quantities: 4000},
                        {recordTime: '2023-03-28T00:00:00', quantities: 5000},
                        {recordTime: '2023-03-29T00:00:00', quantities: 7000},
                        {recordTime: '2023-03-30T00:00:00', quantities: 4000},
                        {recordTime: '2023-03-31T00:00:00', quantities: 3000},
                        {recordTime: '2023-04-01T00:00:00', quantities: 2000},
                        {recordTime: '2023-04-02T00:00:00', quantities: 4000},
                        {recordTime: '2023-04-03T00:00:00', quantities: 4000},
                        {recordTime: '2023-04-04T00:00:00', quantities: 6000},
                        {recordTime: '2023-04-05T00:00:00', quantities: 6000},
                    ]
                }
                break;
            case 'raw':
                res = {
                    weight: 1000,
                    historyList: [
                        {recordTime: "2023-03-07T00:00:00", weight: 100},
                        {recordTime: '2023-03-08T00:00:00', weight: 200},
                        {recordTime: '2023-03-09T00:00:00', weight: 300},
                        {recordTime: '2023-03-10T00:00:00', weight: 400},
                        {recordTime: '2023-03-11T00:00:00', weight: 300},
                        {recordTime: '2023-03-12T00:00:00', weight: 500},
                        {recordTime: '2023-03-13T00:00:00', weight: 200},
                        {recordTime: '2023-03-14T00:00:00', weight: 800},
                        {recordTime: '2023-03-15T00:00:00', weight: 400},
                        {recordTime: '2023-03-16T00:00:00', weight: 600},
                        {recordTime: '2023-03-17T00:00:00', weight: 300},
                        {recordTime: '2023-03-18T00:00:00', weight: 600},
                        {recordTime: '2023-03-19T00:00:00', weight: 600},
                        {recordTime: '2023-03-20T00:00:00', weight: 200},
                        {recordTime: '2023-03-21T00:00:00', weight: 200},
                        {recordTime: '2023-03-22T00:00:00', weight: 500},
                        {recordTime: '2023-03-23T00:00:00', weight: 600},
                        {recordTime: '2023-03-24T00:00:00', weight: 500},
                        {recordTime: '2023-03-25T00:00:00', weight: 300},
                        {recordTime: '2023-03-26T00:00:00', weight: 200},
                        {recordTime: '2023-03-27T00:00:00', weight: 400},
                        {recordTime: '2023-03-28T00:00:00', weight: 500},
                        {recordTime: '2023-03-29T00:00:00', weight: 700},
                        {recordTime: '2023-03-30T00:00:00', weight: 400},
                        {recordTime: '2023-03-31T00:00:00', weight: 300},
                        {recordTime: '2023-04-01T00:00:00', weight: 200},
                        {recordTime: '2023-04-02T00:00:00', weight: 400},
                        {recordTime: '2023-04-03T00:00:00', weight: 400},
                        {recordTime: '2023-04-04T00:00:00', weight: 600},
                        {recordTime: '2023-04-05T00:00:00', weight: 600},
                    ]
                }
                break;
        }
        transferDate(res)
        setAllHistory(res)
    }, [])

    return (
        <div className={styles.inventory_container}>
            <div className={styles.container_title}>
                <span>{inventoryProps.type==='raw' ? 'Raw Material: ' : 'Product: '}</span>
            </div>
                {
                    [1, 2, 3, 4, 5, 6, 7].map(item => (<InventoryBox {...{allHistory, type: inventoryProps.type, name: 'coco1'}}/>))
                }
        </div>
    )
}

const InventoryBox = ({allHistory, type, name}: { allHistory: InventoryBoxProps, type: string, name: string }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const {quantities, weight, historyList} = allHistory
    const nameProcess = (name:string)=>{
        return type === 'raw' ? name+' / kg' : name+' / pkg'
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
        yField: type === 'raw' ? 'weight' : 'quantities',
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

