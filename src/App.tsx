import React from "react"
import style from "./styles/styles.module.css";
import { Map } from "./components/map/Map";
import { Sidebar } from "./components/sidebar/Sidebar";
import Layout, { Content } from "antd/lib/layout/layout";
import Sider from "antd/lib/layout/Sider";
import "antd/dist/antd.css";
import { useResize } from "./hooks/useResize";



export default function App() {

  const [refSideBar, sidebarWidth, startResizing] = useResize()


  return (
    <Layout>
      <div className={style.wrapper}>
        <div
          ref={refSideBar}
          className={style.sidebar}
          style={{ width: sidebarWidth }}
          onMouseDown={(e) => e.preventDefault()}
        >
          <Sider style={{ height: "100vh" }} width={"100%"} theme="light">
            <Sidebar />
            <div onMouseDown={startResizing} className={style.resizer} />
          </Sider>
        </div>
        <Content className={style.leafletContainer}>
          <Map />
        </Content>
      </div>
    </Layout>

  );
}
