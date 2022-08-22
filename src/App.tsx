import "./styles.css";
import { Map } from "./components/map/Map";
import { Sidebar } from "./components/sidebar/Sidebar";
import Layout, { Content, Footer, Header } from "antd/lib/layout/layout";
import Sider from "antd/lib/layout/Sider";
import 'antd/dist/antd.css';

export default function App() {
  return (
    <Layout>
      <Sider width={500} theme="light">
        <Sidebar />
      </Sider>
      <Content>
        <Map />
      </Content>
    </Layout>
  );
}
