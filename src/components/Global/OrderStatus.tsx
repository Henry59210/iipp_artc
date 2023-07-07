import {Timeline} from "antd";
import {ClockCircleOutlined} from "@ant-design/icons";
import {role as roleList} from "../../authenticate/urlForm";
import {useAppSelector} from "@/hooks";
import {selectRole} from "@/features/user/userSlice";


const statusForm = {
    PendingCommercialConfirm: 0,
    CommercialConfirmed: 1,
    PendingProcurement: 2,
    PendingNotifyProduction: 3,
    PendingProductionConfirm: 4,
    Producing: 5,
    PendingNotifyShipment: 6,
    PendingShipmentConfirm: 7,
    Packaging: 8,
    ShippedOut: 9,
}
const statusForm_employee = ['Pending Commercial Confirm', 'Commercial Confirmed', 'Pending Procurement', 'Pending Notify Production', 'Pending Production Confirm', 'Producing', 'Pending Notify Shipment', 'Pending Shipment Confirm', 'Packaging', 'Shipped Out']
const statusForm_external = ['Pending Commercial Confirm', 'Commercial Confirmed', 'Pending Procurement', 'Pending Notify Production', 'Pending Production Confirm', 'Producing', 'Pending Notify Shipment', 'Pending Shipment Confirm', 'Packaging', 'Shipped Out']
function generateStatus(statusHistory: string[], role: string) {
    const {employee, external} = roleList
    if(employee.indexOf(role) !== -1) {

    }
}
export const OrderStatus = (props: {statusHistory: Array<string>}) => {
    const role = useAppSelector(selectRole)


    return (
        <Timeline
            mode={"right"}
            items={[
                {
                    label: '2015-09-01',
                    color: "green",
                    children: 'Create a services',
                },
                {
                    label: '2015-09-01 09:12:11',
                    color: "green",
                    children: 'Solve initial network problems',
                },
                {
                    dot: <ClockCircleOutlined style={{ fontSize: '16px' }} />,
                    color: 'orange',
                    label: '2015-09-01 09:12:11',
                    children: 'Technical testing',
                },
                {
                    label: '2015-09-01 09:12:11',
                    color: "grey",
                    children: 'Network problems being solved',
                },
            ]}
        />
    )
}
