import {getLayout, Layout} from "@/components/Layout";
import {useState} from "react";
import {Menu, MenuProps} from "antd";
import styles from "@/styles/workbench.module.css"
import {useDispatch, useSelector} from "react-redux";
import {useAppSelector} from "@/hooks";
import {selectCurrent, setLastTab} from "@/features/pageMemo/pageSlice";

const items: MenuProps['items'] = [
    {
        label: 'Wait for purchase',
        key: 'purchase',
    },
    {
        label: 'production',
        key: 'production',
    },
    {
        label: 'Shipment',
        key: 'Shipment',
    },
];


const WorkbenchCommercial = () => {
    const lastTab = useAppSelector(selectCurrent)
    // 修改数据
    const dispatch = useDispatch()
    const [current, setCurrent] = useState('purchase');
    const onClick: MenuProps['onClick'] = (e) => {
        dispatch(setLastTab(e.key))
    };
    return (
        <>
            <Menu className={styles.navbar} onClick={onClick} selectedKeys={[lastTab?lastTab:current]} mode="horizontal" items={items} />
            <div className={styles.container_commercial}>
            </div>
        </>
    );
}



export default WorkbenchCommercial

WorkbenchCommercial.getLayout = getLayout
