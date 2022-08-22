import { Dropdown, Space, Table, Menu, Select } from "antd";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { getPointsForNewRoute } from "../../../redux/slices/route";
import { DownOutlined } from '@ant-design/icons';
import { changeLead } from "../../../redux/slices/leads";
import { useEffect, useRef, useState } from "react";
import { log } from "console";

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
            (e) => {console.log(e); 
            const x = "столбец откуда"; 
            console.log(x)
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
            const x = "столбец куда"; 
            console.log(x)
          }}
          options={opt}
        />
      )
    },
  ];

  const [newPoint, setNewPoint] = useState("")
  const [currentLead, setCurrentLead] = useState('')

  const putNewPoint = (lead?: string, point?: string) => {
    if (lead && point) {
      console.log(lead, point)
    }
  }

  useEffect(() => {
    putNewPoint(currentLead, newPoint)
    setNewPoint('')
  }, [currentLead, newPoint])

  return (
    <Table
      pagination={false}
      onRow={(record, index) => {
        return {
          onClick: event => { dispatch(getPointsForNewRoute([record.from, record.to])) },
          onSelect: e => console.log(record.name)
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
