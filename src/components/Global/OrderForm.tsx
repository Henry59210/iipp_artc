import {Space, Table, Tag} from 'antd';
import type {ColumnsType} from 'antd/es/table';

interface DataType {
    id: string,
    customerId: string,
    orderDate: string,
    expectedTime: string,
    status: string,
    productList: Array<{ id: string, productName: string, quantity: number }>
}

const data: DataType[] = [
    {
        id: '1234',
        customerId: 'Singapore',
        orderDate: '2020-3-4',
        expectedTime: '2020-3-6',
        status: 'wait for raw',
        productList: [{id: '2222', productName: 'MIX CHOC DRINK KR 560G 16/CS', quantity: 4000}]
    }, {
        id: '1234',
        customerId: 'Singapore',
        orderDate: '2020-3-4',
        expectedTime: '2020-3-6',
        status: 'wait for raw',
        productList: [{id: '2222', productName: 'MIX CHOC DRINK KR 560G 16/CS', quantity: 4000}]
    }
];

export const OrderForm = (props: {
    role: string, //根据角色请求不同数据
    type: string, //根据type自定义表头以及最后一列的操作，定义能否多选
    changePage?: Function, //分页函数
}) => {

    const columns: ColumnsType<DataType> = [
        {
            title: 'Department',
            dataIndex: 'customerId',
            key: 'customerId',
        },
        {
            title: 'Expected Date',
            dataIndex: 'expectedTime',
            key: 'expectedTime',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a>Detail</a>
                </Space>
            ),
        },
    ];
    return <Table columns={columns} dataSource={data}/>
}


