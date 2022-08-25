import {  Table, Select } from "antd";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { getPointsForNewRoute, setIsWrongPoints } from "../../../redux/slices/route";

import { useEffect, useState } from "react";
import { changeLead } from "../../../redux/slices/leads";





export const LeadsTable = () => {
  const dispatch = useAppDispatch()
  const dataSource = useAppSelector(store => store.leads.leads)
  const points = useAppSelector(store => store.points.points)
  
  const opt = points.map(el => ({ label: el.name, value: el.name }))    

  const [selectedRowKeys, setSelectedRowKeys] = useState([0])
  
  const selectRow = (record:any) => {
    setSelectedRowKeys( [record.id] );
  }  
  const [newPoint, setNewPoint] = useState("")
  const [currentLead, setCurrentLead] = useState('')
  const [selectType, setSelectType] = useState('')
  
  const  onSelectedRowKeysChange = (keys:any) => {
    setSelectedRowKeys(keys);
  }
  
  const onClickSelectHandler = (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation()
      dispatch(setIsWrongPoints({isWrongPoints: false}))
  }
  
  const passPointInfoFrom = (e:string) => {
    const FROM = "from"
    setNewPoint(e); 
    setSelectType(FROM)
    dispatch(getPointsForNewRoute({points:[e], selectType:FROM}))
  }
  const passPointInfoTo = (e:string) => {
    const TO = "to"
    setNewPoint(e); 
    setSelectType(TO)
    dispatch(getPointsForNewRoute({points:[e], selectType:TO}))
  }



  
  const columns = [
    {
      title: 'ID заявки',
      dataIndex: 'id',
      key: 'id',
      width: "10px",
    },
    {
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
      width: "10px",
    },
    {
      title: 'Откуда',
      dataIndex: 'from',
      id: "from",
      name: "from",
      key: "from",
      width: "10px",
      render: (name: string) => (
        <Select
          key="from"
          defaultValue={name}
          value={name}
          onClick={onClickSelectHandler}
          onChange={passPointInfoFrom}
          options={opt}
        />        
      )
    },
    {
      title: 'Куда',
      dataIndex: 'to',
      name: "to",
      key: "to",
      id: "to",
      width: "10px",
      render: (name: string) => (
        <Select
          key="to"
          defaultValue={name}
          value={name}
          onClick={onClickSelectHandler}
          onChange={passPointInfoTo}
          options={opt}
        />
      )
    },
  ];



  const changeCurrentLead = (leadName?:string, newPoint?:string, selectType?: string)=> {
    if (leadName && newPoint && selectType) {
      dispatch(changeLead({leadName, newPoint, selectType}))
    }
  }
  
  

  useEffect(() => {
    changeCurrentLead(currentLead, newPoint, selectType)
    setNewPoint('')
  }, [currentLead, newPoint, selectType])
  
      


  return (
    <Table
      rowSelection={{
            type: "radio",
            selectedRowKeys,
            onChange: onSelectedRowKeysChange
        }}
      pagination={false}
      onRow={(record) => {
        return {
          onClick: () => { 
              dispatch(getPointsForNewRoute({points:[record.from, record.to]}))
              selectRow(record);          
                },
          onSelect: () => { 
              selectRow(record);  
              setCurrentLead(record.name); 
              dispatch(setIsWrongPoints({isWrongPoints: false}))
              dispatch(getPointsForNewRoute({points:[record.from, record.to]}))
              },   
                   
        }
      }}
      tableLayout='auto'
      size="small"
      scroll={{ x: 'max-content' }}
      dataSource={dataSource}
      columns={columns}
      rowKey="id"
    />
  )
};
