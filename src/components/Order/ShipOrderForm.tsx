import {Button, ConfigProvider, Popover, Space, Table, TablePaginationConfig, Tag} from 'antd';
import type {ColumnsType, ColumnType} from 'antd/es/table';
import React, {ReactNode, useRef, useState} from "react";
import styles from "@/components/Global/styles.module.css";
import {CombineProductItem, CombineShipItem, CombineShipItemOrders, OrderInfo} from "@/apis/order";
import {dateConvert} from "@/utilities/usefulTools";

export const ShipOrderForm = ({data, action}: {
    data: CombineShipItem[],
    action: Function // open modal
}) => {
    const generateExpectTimeRange = (expectTimeList:CombineShipItemOrders[]) => {
        const result:number[] = []
        if(!expectTimeList.length) return ' - '
        expectTimeList.map(item=>{
            const timeStamp = new Date(item.expectedTime).valueOf()
            result.push(timeStamp)
        })
        result.sort((a,b) => a-b)
        console.log(result[0].toString())

        return [dateConvert(result[0], ['YYYY', '-', 'MM', '-', 'DD']), dateConvert(result[result.length-1],['YYYY', '-', 'MM', '-', 'DD'])].join(' --- ')
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
            {
                title: 'Expected Date',
                dataIndex: 'expectedTime',
                key: 'expectedTime',
                align: 'center',
                render: (_,record) => (
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
                    <a onClick={() => {action(record)}}>Details</a>
                </div>,
            },
        ]


    return <Table
        rowKey={(record) => record.id}
        columns={columns}
        pagination={false}
        sticky={true}
        dataSource={data}/>

}


