import styles from "@/components/Workbench/production/styles.module.css";
import {ColumnsType} from "antd/es/table";
import {productFormatConvert} from "@/utilities/usefulTools";
import {nameRender} from "@/components/Details/InventoryDetails";
import {Input, Table, Tooltip} from "antd";
import React, {useEffect, useState} from "react";
import {CombineProductOrderDetail, getExpectedOrderData, MaterialInfo} from "@/apis/order";
import {ItemText} from "@/components/Global/ItemText";

export const UpdateMaterial = ({id, getLatestArray, getLength}: { id: string, getLatestArray: Function, getLength:Function }) => {
    const [expectData, setExpectData] = useState<Omit<CombineProductOrderDetail, 'id' | 'orderList'>>({
        materialRequiredList: [],
        productRequiredList: []
    })
    useEffect(() => {
        (async function () {
            const res = await getExpectedOrderData(id)
            if (res.data !== null) {
                setExpectData(res.data)
                getLength(res.data.materialRequiredList.length)
            }
        })()
    }, [])
    return (
        <div className={styles.update_pending_container}>
            <div className={styles.update_production_container}>
                <div className={styles.hint_font}>Production</div>
                <div className={styles.items_container}>
                    {expectData.productRequiredList.map(item => (
                        <ItemText key={item.id} title={item.productName} value={item.quantity} bold={true}/>
                    ))}
                </div>
            </div>
            <div className={styles.update_material_container}>
                <div className={styles.hint_font}>
                    <span style={{flex: 3}}>Material Usage</span>
                    <span style={{flex: 7}}>( Actual | Expected )</span>
                </div>
                <div className={styles.items_container}>
                    {expectData.materialRequiredList.map(item => <MaterialItem key={item.materialId} item={item} id={id}
                                                                               expectedMaterialArr={expectData.materialRequiredList}
                                                                               getLatestArray={getLatestArray}/>)}
                </div>
            </div>
        </div>
    )
}


interface NumericInputProps {
    value: string;
    onChange: (value: string) => void;
}

const MaterialItem = ({
                          item,
                          id,
                          expectedMaterialArr,
                          getLatestArray
                      }: { item: MaterialInfo, id: string, expectedMaterialArr: MaterialInfo[], getLatestArray: Function }) => {
    const [value, setValue] = useState('');
    const onChangeInput = (value: string, materialId: string) => {
        setValue(value)
        getLatestArray(value, item.weight, id, materialId,  expectedMaterialArr.length)
    }
    return (
        <div className={styles.material_item}>
            <div className={styles.title}>
                <span>{productFormatConvert(item.materialName).mainName}</span>
                <br/>
                <span
                    style={{fontSize: '12px'}}>{productFormatConvert(item.materialName).specification}</span>
            </div>
            <div className={styles.value}>
                <div className={styles.value_input}>
                    <NumericInput value={value} onChange={(value) => onChangeInput(value, item.materialId)}/>
                </div>
                <div className={styles.value_data}>
                    {`${item.weight}\u00A0\u00A0 kg`}
                </div>
            </div>
        </div>)
}

const NumericInput = (props: NumericInputProps) => {
    const {value, onChange} = props;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {value: inputValue} = e.target;
        const reg = /^-?\d*(\.\d*)?$/;
        if (reg.test(inputValue) || inputValue === '' || inputValue === '-') {
            onChange(inputValue);
        }
    };
    const handleBlur = () => {
        let valueTemp = value;
        if (value.charAt(value.length - 1) === '.' || value === '-') {
            valueTemp = value.slice(0, -1);
            onChange(valueTemp.replace(/0*(\d+)/, '$1'));
        }
    };

    return (
        <Input
            {...props}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Actual usage"
            maxLength={16}
        />
    );
};
