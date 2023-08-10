import {Button, DatePicker, Form, FormInstance, Input, Modal, Space} from "antd";
import {useEffect, useState} from "react";
import styles from "@/components/Workbench/shipment/styles.module.css";
import {shipInfo, submitShipInfo} from "@/apis/order";
import {Dayjs} from "dayjs";

const carplate = require('sg-carplate');

export const UpdateShipInfo = ({
                                   id,
                                   open,
                                   updateShipmentList,
                                   closeModal
                               }: { id: string, open: boolean, updateShipmentList: Function, closeModal: () => void }) => {
    const [validateStatus, setValidateStatus] = useState<"" | "error" | "success" | "warning" | "validating" | undefined>(undefined); // 受控的校验状态
    const [validateHelp, setValidateHelp] = useState(''); // 校验的提示信息
    const [form] = Form.useForm();
    const handleIdValidator = async (_: any, value: string) => {
        console.log(carplate.validate(value))
        if (value === undefined || !value.trim()) {
            setValidateStatus('error');
            setValidateHelp('Please enter plate！');
            throw new Error();
        }
        if (!carplate.validate(value.trim())) {
            setValidateStatus('error');
            setValidateHelp('Wrong plate');
            throw new Error()
        }
        if (carplate.validate(value.trim())) {
            setValidateStatus('success');
            setValidateHelp('');
        }
    }

    const onFinish = async ({trackingId, carPlate, leavingTime}: { trackingId: string, carPlate: string, leavingTime: Dayjs }) => {
        const obj: shipInfo = {
            trackingId,
            carPlate,
            leavingTime: leavingTime.format('YYYY-MM-DDT00:00:00'),
            id: id
        }
        await submitShipInfo(obj).catch(()=>{
            closeModal()
        })
        await updateShipmentList()
        closeModal()
    }
    return (
        <Modal
            title="Update Shipment Information"
            centered
            destroyOnClose={true}
            open={open}
            okText={'confirm'}
            onOk={() => form.submit()}
            onCancel={() => closeModal()}
            width={800}
        >
            <Form name="basic"
                  className={styles.update_modal_container}
                  form={form}
                  labelCol={{ span: 12 }}
                  size={"large"}
                  labelAlign={"left"}
                  layout={'horizontal'}
                  autoComplete="off"
                  onFinish={onFinish}
            >
                <div className={styles.info_container}>
                    <Form.Item name="trackingId"
                               label={<span  style={{ fontSize: 18 }}>Tracking Id</span>} rules={[{required: true}]}>
                        <Input className={styles.info_input}/>
                    </Form.Item>
                    <Form.Item name="carPlate" label={<span  style={{ fontSize: 18 }}>Car Plate ( SKD4533B )</span>}
                               className={styles.date_item}
                               hasFeedback={true}
                               validateTrigger="onBlur" // 输入完成, 失去焦点后开始校验
                               validateStatus={validateStatus}
                               help={validateHelp}
                               rules={[
                                   {required: true},
                                   {validator: handleIdValidator},
                               ]}>
                        <Input className={styles.info_input}/>
                    </Form.Item>
                    <Form.Item name="leavingTime"
                               className={styles.date_item}
                               label={<span  style={{ fontSize: 18 }}>Expected Leaving Time</span>} rules={[{required: true}]}>
                        <DatePicker className={styles.info_date}/>
                    </Form.Item>
                </div>
            </Form>
        </Modal>
    );
}
