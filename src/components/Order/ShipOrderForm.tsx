import {Button, ConfigProvider, Popover, Space, Table, TablePaginationConfig, Tag} from 'antd';
import type {ColumnsType, ColumnType} from 'antd/es/table';
import React, {ReactNode, useRef, useState} from "react";
import styles from "@/components/Global/styles.module.css";
import {CombineProductItem, CombineShipItem, CombineShipItemOrders, OrderInfo} from "@/apis/order";
import {dateConvert} from "@/utilities/usefulTools";


const reference: { [key: string]: ColumnType<CombineShipItem> } = {
    carPlate: {
        title: 'Car Plate',
        dataIndex: 'carPlate',
        key: 'carPlate',
        align: 'center'
    },
    leavingTime: {
        title: 'Leaving Date',
        dataIndex: 'leavingTime',
        key: 'leavingTime',
        align: 'center',
        render: (_, record) =>
            (
                <div>
                    {dateConvert((record as CombineShipItem).leavingTime, ['YYYY', '-', 'MM', '-', 'DD'])}
                </div>
            )
    }
}
export const ShipOrderForm = ({data, action, checkbox, expectColumn, node, selectedAction}: {
    data: CombineShipItem[],
    action: Function // open modal
    expectColumn?: Array<'carPlate' | 'leavingTime'>,
    node: string[],
    selectedAction?: Function
    checkbox: boolean
}) => {
    let expectArr: ColumnsType<CombineShipItem> = []

    if (expectColumn !== undefined) {
        expectArr = expectColumn.map(item => reference[item])
    }
    const generateExpectTimeRange = (expectTimeList: CombineShipItemOrders[]) => {
        const result: number[] = []
        if (!expectTimeList.length) return ' - '
        expectTimeList.map(item => {
            const timeStamp = new Date(item.expectedTime).valueOf()
            result.push(timeStamp)
        })
        result.sort((a, b) => a - b)

        return [dateConvert(result[0], ['YYYY', '-', 'MM', '-', 'DD']), dateConvert(result[result.length - 1], ['YYYY', '-', 'MM', '-', 'DD'])].join(' --- ')
    }
    const columns: ColumnsType<CombineShipItem> = [
        // {
        //     title: 'Dep.',
        //     dataIndex: 'customerId',
        //     key: 'customerId',
        //     align: 'center',
        //     render: (text, record) => (<div>{text}</div>)
        // },
        {
            title: 'Combo Id',
            dataIndex: 'id',
            key: 'id',
            align: 'center'
        },
        ...expectArr,
        {
            title: 'Expected Date',
            dataIndex: 'expectedTime',
            key: 'expectedTime',
            align: 'center',
            render: (_, record) => (
                <div>{generateExpectTimeRange(record.orders)}</div>
            )
        },
        {
            title: 'Action',
            key: 'action',
            align: 'center',
            render: (_, record) => <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                color: '#409EFF'
            }}>
                {
                    node.map((item, index) => <a key={index} onClick={() => action(record, item)}>{item}</a>)
                }
            </div>,
        },
    ]

    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: CombineShipItem[]) => {
            selectedAction!(selectedRows as CombineShipItem[])
        },
    };

    return <Table
        rowKey={(record) => record.id}
        rowSelection={checkbox ? rowSelection : undefined}
        columns={columns}
        pagination={false}
        sticky={true}
        dataSource={data}/>

}


