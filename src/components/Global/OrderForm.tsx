import {Button, ConfigProvider, Popover, Space, Table, TablePaginationConfig, Tag} from 'antd';
import type {ColumnsType, ColumnType} from 'antd/es/table';
import React, {ReactNode, useRef, useState} from "react";
import styles from "@/components/Global/styles.module.css";
import {CombineProductItem, OrderInfo} from "@/apis/order";
import {dateConvert} from "@/utilities/usefulTools";

type dataType<T> = T extends true ? CombineProductItem : OrderInfo

const reference: { [key: string]: ColumnType<CombineProductItem | OrderInfo> } = {
    id: {
        title: 'Order Id',
        dataIndex: 'id',
        key: 'id',
        align: 'center'
    },
    expectedTime: {
        title: 'Expected Date',
        dataIndex: 'expectedTime',
        key: 'expectedTime',
        align: 'center',
        render: (_, record) =>
            (
                <div>
                    {dateConvert((record as OrderInfo).expectedTime, ['YYYY','-','MM', '-', 'DD'])}
                </div>
            )
    },
    status: {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        align: 'center'
    },
    orderDate: {
        title: 'Order Date',
        dataIndex: 'orderDate',
        key: 'orderDate',
        align: 'center',
        render: (_, record) =>
            (
                <div>
                    {dateConvert((record as OrderInfo).orderDate, ['YYYY','-','MM', '-', 'DD'])}
                </div>
            )
    },
}
export const OrderForm = ({expectColumn, data, checkbox, combine, selectedAction, action, node}: {
    expectColumn?: Array<'id' | 'expectedTime' | 'status' | 'orderDate'>,
    data: dataType<typeof combine>[],
    checkbox: boolean,
    selectedAction?: (selectedRows: OrderInfo[]) => void,
    combine: boolean,
    node: string[]
    action: Function // open modal
}) => {
    const checkboxOpp = !checkbox
    let expectArr: ColumnsType<CombineProductItem | OrderInfo> = []

    if (expectColumn !== undefined) {
        expectArr = expectColumn.map(item => reference[item])
    }
    const columns: ColumnsType<dataType<typeof combine>> = combine ? [
            // {
            //     title: 'Dep.',
            //     dataIndex: 'customerDept',
            //     key: 'customerDept',
            //     align: 'center',
            //     render: (text, record) => (<div>{text}</div>)
            // },
            {
                title: 'Combo Id',
                dataIndex: 'id',
                key: 'id',
                align: 'center'
            },
            // {
            //     title: 'Expected Date',
            //     dataIndex: 'expectedTime',
            //     key: 'expectedTime',
            //     align: 'center'
            // },
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
                    {node.map((item, index) => <a key={index} onClick={() => {
                        action(record, item)
                    }}>{item}</a>)}
                </div>,
            },
        ] :
        expectColumn === undefined ? [
            {
                title: 'Dep.',
                dataIndex: 'customerDept',
                key: 'customerDept',
                align: 'center',
                render: (text, record) => (<div>{text}</div>)
            },
            {
                title: 'Order Id',
                dataIndex: 'id',
                key: 'id',
                align: 'center',
            },
            {
                title: 'Expected Date',
                dataIndex: 'expectedTime',
                key: 'expectedTime',
                align: 'center',
                render: (_, record) =>
                    (
                        <div>
                            {dateConvert((record as OrderInfo).expectedTime, ['YYYY','-','MM', '-', 'DD'])}
                        </div>
                    )
            },
            {
                title: 'Status',
                dataIndex: 'status',
                key: 'status',
                align: 'center'
            },
            {
                title: 'Order Date',
                dataIndex: 'orderDate',
                key: 'orderDate',
                align: 'center',
                render: (_, record) =>
                    (
                        <div>
                            {dateConvert((record as OrderInfo).expectedTime, ['YYYY','-','MM', '-', 'DD'])}
                        </div>
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
        ] : [
            {
                title: 'Dep.',
                dataIndex: 'customerDept',
                key: 'customerDept',
                width: 100,
                align: 'center',
                render: (text, record) => (<div>{text}</div>)
            },
            ...expectArr,
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
            },]


    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: dataType<typeof checkboxOpp>[]) => {
            selectedAction!(selectedRows as OrderInfo[])
        },
    };
    return <Table
        rowKey={(record) => record.id}
        columns={columns}
        rowSelection={checkbox ? rowSelection : undefined}
        pagination={false}
        sticky={true}
        dataSource={data}/>

}


