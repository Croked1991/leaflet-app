import { Divider, Typography } from "antd";
import { LeadsTable } from "./leads/Leads";

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
