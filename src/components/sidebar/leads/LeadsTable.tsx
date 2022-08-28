import { Table, Select } from "antd";
import { useTableHelpers } from "../../../hooks/useTableHelpers";
import { Lead } from "../../../types/slices";


export const LeadsTable = () => {

  const {
    onClickSelectHandler,
    passPointInfoFrom,
    passPointInfoTo,
    selectOptions,
    rowSelection,
    onRowHandler,
    tableData
  } = useTableHelpers()

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      id: "id",
      name: "id"
    },
    {
      title: "Название",
      dataIndex: "name",
      key: "name",
      id: "name",
      name: "name"
    },
    {
      title: "Откуда",
      dataIndex: "from",
      key: "from",
      id: "from",
      name: "from",
      render: (name: string) => (
        <Select
          key="from"
          defaultValue={name}
          value={name}
          onClick={onClickSelectHandler}
          onChange={passPointInfoFrom}
          options={selectOptions}
        />
      )
    },
    {
      title: "Куда",
      dataIndex: "to",
      key: "to",
      id: "to",
      name: "to",
      render: (name: string) => (
        <Select
          key="to"
          defaultValue={name}
          value={name}
          onClick={onClickSelectHandler}
          onChange={passPointInfoTo}
          options={selectOptions}
        />
      )
    },
  ];

  return (
    <Table
      rowSelection={rowSelection}
      pagination={false}
      onRow={(lead: Lead) => onRowHandler(lead)}
      tableLayout="auto"
      size="small"
      scroll={{ x: "max-content" }}
      dataSource={tableData}
      columns={columns}
      rowKey="id"
    />
  )
};
