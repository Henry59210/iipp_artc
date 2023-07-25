import {NextPageWithLayout} from "@/pages/_app";
import {getLayout} from "@/components/Layout";
import {Menu, MenuProps} from "antd";
import {useAppSelector} from "@/hooks";
import {selectWorkbenchCurrent, setLastWorkbenchTab, WorkbenchTabs} from "@/features/pageMemo/pageSlice";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {ProductionOrder} from "@/components/Workbench/production/ProductionOrder";
import styles from "@/styles/workbench.module.css";
import {ShipmentOrder} from "@/components/Workbench/shipment/ShipmentOrder";


const items: MenuProps['items'] = [
    {
        label: 'Pending',
        key: 'pending',
    },
    {
        label: 'Fulfilled',
        key: 'fulfilled',
    }
];


const WorkbenchShipment: NextPageWithLayout = () => {
    const currentTab_workbench = useAppSelector(selectWorkbenchCurrent)
    // 修改数据
    const dispatch = useDispatch()
    useEffect(()=>{
        if(currentTab_workbench === '') dispatch(setLastWorkbenchTab('pending'))
    },[])
    const currentComponent = () => currentTab_workbench === 'pending' ? <ShipmentOrder key={1} type={'pending'}/> : <ShipmentOrder key={2} type={'fulfilled'}/>

    const selectTab: MenuProps['onClick'] = (e) => {
        dispatch(setLastWorkbenchTab(e.key as WorkbenchTabs))
    };
    return (
        <div>
            <Menu className={styles.navbar} onClick={selectTab} selectedKeys={[currentTab_workbench]} mode="horizontal" items={items} />
            <div className={styles.container_commercial}>
                {currentComponent()}
            </div>
        </div>
    )
}

export default WorkbenchShipment

WorkbenchShipment.getLayout = getLayout
