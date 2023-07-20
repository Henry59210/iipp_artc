import {NextPageWithLayout} from "@/pages/_app";
import {getLayout} from "@/components/Layout";
import styles from "@/styles/workbench.module.css";
import {Menu, MenuProps} from "antd";
import {useAppSelector} from "@/hooks";
import {selectWorkbenchCurrent, setLastWorkbenchTab, WorkbenchTabs} from "@/features/pageMemo/pageSlice";
import {useDispatch} from "react-redux";

import {useEffect} from "react";
import { ProductionOrder} from "@/components/Workbench/production/ProductionOrder";

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


const WorkbenchProduction: NextPageWithLayout = () => {
    const currentTab_workbench = useAppSelector(selectWorkbenchCurrent)
    // 修改数据
    const dispatch = useDispatch()
    useEffect(()=>{
        if(currentTab_workbench === '') dispatch(setLastWorkbenchTab('pending'))
    },[])
    const currentComponent = () => currentTab_workbench === 'pending' ? <ProductionOrder key={1} type={'pending'}/> : <ProductionOrder key={2} type={'fulfilled'}/>

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

export default WorkbenchProduction

WorkbenchProduction.getLayout = getLayout
