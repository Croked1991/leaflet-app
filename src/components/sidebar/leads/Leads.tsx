import {  Table, Select } from "antd";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { getPointsForNewRoute } from "../../../redux/slices/route";

import { useEffect, useState } from "react";
import { changeLead } from "../../../redux/slices/leads";


export const LeadsTable = () => {
  const dispatch = useAppDispatch()
  const dataSource = useAppSelector(store => store.leads.leads)
  const points = useAppSelector(store => store.points.points)

  const opt = points.map(el => ({ label: el.name, value: el.name }))

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
      render: (index: string) => (
        <Select
          key="from"
          defaultValue={index}
          onClick={e => e.stopPropagation()}
          style={{ width: 120 }}
          onChange={
            (e) => {setNewPoint(e); 
            setSelectType("столбец откуда")
          }}
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
      render: (index: string) => (
        <Select
          key="to"
          defaultValue={index}
          onClick={(e)=> { e.stopPropagation() }}
          style={{ width: 120 }}
          onChange={
            (e) => {setNewPoint(e); 
            setSelectType("столбец куда")
          }}
          options={opt}
        />
      )
    },
  ];

  const [newPoint, setNewPoint] = useState("")
  const [currentLead, setCurrentLead] = useState('')
  const [selectType, setSelectType] = useState('')


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
      pagination={false}
      onRow={(record, index) => {
        return {
          onClick: event => { dispatch(getPointsForNewRoute([record.from, record.to])) },
          onSelect: e => setCurrentLead(record.name)
        }
      }}
      tableLayout='auto'
      size="small"
      scroll={{ x: 'max-content' }}
      dataSource={dataSource}
      columns={columns}
    />
  )
};
