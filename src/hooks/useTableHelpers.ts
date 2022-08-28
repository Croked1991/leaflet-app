import { RowSelectionType } from "antd/lib/table/interface";
import { Lead } from "../types/slices";
import { Key } from "antd/lib/table/interface";
import { useState, useEffect } from "react";
import { useAppSelector } from "./useAppSelector";
import React from "react"
import { useAppDispatch } from "./useAppDispatch";
import { KindOfPoint } from "../types/sagas";
import { getPointsForNewRoute, setIsWrongPoints } from "../redux/slices/route";
import { TO, FROM } from "../constantes/constantes";
import { changeLead } from "../redux/slices/leads";

export const useTableHelpers = () => {
    
    const dispatch = useAppDispatch()
    
    const tableData = useAppSelector(store => store.leads.leads)
    const points = useAppSelector(store => store.points.points)

    const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([0])
    const [newPointToRoute, setNewPointToRoute] = useState("")
    const [currentLead, setCurrentLead] = useState("")
    const [kindOfPoint, setKindofPoint] = useState<KindOfPoint | undefined>()

    const selectOptions = points.map(el => ({ label: el.name, value: el.name }))

    const selectRow = (lead: Lead) => {
        setSelectedRowKeys([lead.id]);
    }

    const onSelectedRowKeysChange = (keys: Key[]) => {
        setSelectedRowKeys(keys);
    }

    const onClickSelectHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
        dispatch(setIsWrongPoints(false))
    }

    const passPointInfoFrom = (pointName: string) => {
        setNewPointToRoute(pointName);
        setKindofPoint(FROM)
        dispatch(getPointsForNewRoute({ points: [pointName], selectType: FROM }))
    }

    const passPointInfoTo = (pointName: string) => {
        setNewPointToRoute(pointName);
        setKindofPoint(TO)
        dispatch(getPointsForNewRoute({ points: [pointName], selectType: TO }))
    }

    const changeCurrentLead = (leadName?: string, newPoint?: string, selectType?: KindOfPoint | undefined) => {
        if (leadName && newPoint && selectType) {
            dispatch(changeLead({ leadName, newPoint, selectType }))
        }
    }

    useEffect(() => {
        changeCurrentLead(currentLead, newPointToRoute, kindOfPoint)
        setNewPointToRoute("")
    }, [currentLead, newPointToRoute, kindOfPoint])

    const onSelectHandler = (lead: Lead) => {
        selectRow(lead);
        setCurrentLead(lead.name);
        dispatch(setIsWrongPoints(false))
        dispatch(getPointsForNewRoute({ points: [lead.from, lead.to] }))
    }

    const onClickHandler = (lead: Lead) => {
        dispatch(getPointsForNewRoute({ points: [lead.from, lead.to] }))
        selectRow(lead);
    }

    const onRowHandler = (lead: Lead) => {
        return {
            onClick: () => onClickHandler(lead),
            onSelect: () => onSelectHandler(lead),
        }
    }

    const rowSelection = {
        type: "radio" as RowSelectionType,
        selectedRowKeys,
        onChange: onSelectedRowKeysChange
    }

    return {
        onClickSelectHandler, 
        passPointInfoFrom, 
        passPointInfoTo, 
        selectOptions, 
        rowSelection, 
        onRowHandler,
        tableData
    }
}
