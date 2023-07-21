import styles from "@/components/Order/styles.module.css";
import {Button, DatePicker, Form, Input, Select, SelectProps} from "antd";
import {useEffect, useState} from "react";

const {RangePicker} = DatePicker;
import {Dayjs} from "dayjs";
import {getDepartment, OrderRequest} from "@/apis/order";
import {orderStatus} from "@/components/Global/statusList";

export type Filter = {
    orderId: string,
    customerDept: string[],
    expectedDate: Dayjs[],
    orderDate: Dayjs[],
    status: string[]
}

export const OrderFilter = (props: { type: 'employee' | 'customer', getFilterData: (obj: OrderRequest) => void, status?: string, combine: boolean }) => {
    const [form] = Form.useForm();
    const [allDept, setAllDept] = useState<SelectProps['options'] >([])

    const deptOptions: SelectProps['options'] = [];

    useEffect(() => {
        (async function(){
            await getDeptOptions()
        })()
        onFinish()
    }, [])

    const getDeptOptions = async () => {
        const res = await getDepartment()
        if(res.data !== null) {
            res.data.forEach(item=>{
                deptOptions.push({label: item, value: item})
            })
            setAllDept(deptOptions)
        }
    }
    const onFinish = (values?: Filter) => {
        console.log(values)
        const initialObj: OrderRequest = {
            orderId: '',
            customerDept: [],
            expectedTimeBegin: '',
            expectedTimeEnd: '',
            orderDateBegin: '',
            orderDateEnd: '',
            status: props.status ? [props.status] : []
        }
        if (!values) return props.getFilterData(initialObj)

        const {orderId, customerDept, expectedDate, orderDate, status} = values
        const [expectedTimeBegin, expectedTimeEnd] = expectedDate ? expectedDate.map(item => item.format('YYYY-MM-DDT00:00:00')) : ['', '']
        const [orderDateBegin, orderDateEnd] = orderDate ? orderDate.map(item => item.format('YYYY-MM-DDT00:00:00')) : ['', '']
        const obj: OrderRequest = {
            orderId: orderId ? orderId : '',
            customerDept: customerDept ? customerDept : [],
            expectedTimeBegin,
            expectedTimeEnd,
            orderDateBegin,
            orderDateEnd,
            status: props.status ? [props.status] : status ? status : []
        }
        props.getFilterData(obj)
    };
    return (
        <div className={styles.order_filter}>
            <Form layout="inline"
                  form={form}
                  onFinish={onFinish}
                  className={styles.form}
            >
                <Form.Item
                    label="OrderId"
                    name="orderId"
                    className={styles.form_item}
                >
                    <Input className={styles.form_item_input} placeholder="Enter orderId"/>
                </Form.Item>
                {props.type === 'employee' ? <Form.Item
                    label="Department"
                    name="customerDept"
                    className={styles.form_item}
                >
                    <Select
                        className={styles.form_item_input}
                        mode="multiple"
                        allowClear
                        placeholder="Please select"
                        options={allDept}
                    />
                    {/*<Input className={styles.form_item_input} placeholder="Enter department"/>*/}
                </Form.Item> : null}
                <Form.Item
                    label="Expect Date:"
                    name="expectedDate"
                    className={styles.form_item}
                >
                    <RangePicker className={styles.form_item_date}/>
                </Form.Item>
                {
                    !props.combine ? (<Form.Item
                        label="Order Date:"
                        name="orderDate"
                        className={styles.form_item}
                    >
                        <RangePicker className={styles.form_item_date}/>
                    </Form.Item>) : null
                }
                {
                    !props.status ? (<Form.Item
                        label="Status:"
                        name="status"
                        className={styles.form_item}
                    >
                        <Select
                            className={styles.form_item_select}
                            mode="multiple"
                            options={orderStatus}
                        />
                    </Form.Item>) : null
                }
            </Form>
            <div className={styles.button}>
                <Button type="primary" onClick={() => form.submit()}>Apply</Button>
            </div>
        </div>
    );
};
