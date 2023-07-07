import {getLayout, Layout} from "@/components/Layout";
import {Menu, MenuProps} from "antd";
import styles from "@/styles/workbench.module.css"
import {useDispatch, useSelector} from "react-redux";
import {useAppSelector} from "@/hooks";
import {selectWorkbenchCurrent, setLastWorkbenchTab, WorkbenchTabs} from "@/features/pageMemo/pageSlice";
import {PurchaseArea} from "@/components/Workbench/commercial/PurchaseArea";
import {ProductionArea} from "@/components/Workbench/commercial/ProductionArea";
import {ShipmentArea} from "@/components/Workbench/commercial/ShipmentArea";

const items: MenuProps['items'] = [
    {
        label: 'Wait for purchase',
        key: 'purchase',
    },
    {
        label: 'Production',
        key: 'production',
    },
    {
        label: 'Shipment',
        key: 'shipment',
    },
];


const WorkbenchCommercial = () => {
    const currentTab_workbench = useAppSelector(selectWorkbenchCurrent)
    // 修改数据
    const dispatch = useDispatch()
    const currentComponent = ()=>
        currentTab_workbench === 'purchase' ? <PurchaseArea/> : currentTab_workbench === 'production' ? <ProductionArea/> : <ShipmentArea/>
    const selectTab: MenuProps['onClick'] = (e) => {
        dispatch(setLastWorkbenchTab(e.key as WorkbenchTabs))
    };
    return (
        <>
            <Menu className={styles.navbar} onClick={selectTab} selectedKeys={[currentTab_workbench]} mode="horizontal" items={items} />
            <div className={styles.container_commercial}>
                {currentComponent()}
            </div>
        </>
    );
}



export default WorkbenchCommercial

WorkbenchCommercial.getLayout = getLayout
