import { Typography } from "antd";
import { LeadsTable } from "./leads/LeadsTable";

const {Title} = Typography


export const Sidebar = () => {
  return (
      <Typography>
        <Title>
          Заявки
        </Title>
        <LeadsTable />
      </Typography>
  )
};
