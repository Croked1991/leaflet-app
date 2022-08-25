import React, {  useCallback, useEffect, useRef, useState } from 'react'
import "./styles.css";
import { Map } from "./components/map/Map";
import { Sidebar } from "./components/sidebar/Sidebar";
import Layout, { Content, Footer, Header } from "antd/lib/layout/layout";
import Sider from "antd/lib/layout/Sider";
import 'antd/dist/antd.css';



export default function App() {
  
  const refBar = useRef<HTMLDivElement>(null);
  const [isResizing, setIsResizing] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(0);

  const startResizing = useCallback(() => {
    setIsResizing(true);
  }, []);

  const stopResizing = useCallback(() => {
    setIsResizing(false);
  }, []);

  const resize = useCallback(
    (mouseMoveEvent:MouseEvent) => {
      if (isResizing) {
        setSidebarWidth(
          mouseMoveEvent.clientX -
            refBar.current!.getBoundingClientRect().left
        );
      }
    },
    [isResizing]
  );

  useEffect(() => {
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResizing);
    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [resize, stopResizing]);
    

  return (
    
    <Layout>
        <div className='wrapper'>
            <div 
            ref={refBar} 
            className="resBar"
            style={{ width: sidebarWidth }}
            onMouseDown={(e) => e.preventDefault()}
        > 
                <Sider style={{height:"100vh"}} width={"100%"} theme="light">
                    <Sidebar />
                    <div onMouseDown={startResizing} className="resizer" />
                </Sider>
            </div>
                <Content className='app-frame'>
                    <Map />
                </Content>
            </div>
    </Layout>
  
  );
}


    // const refBar = useRef<HTMLDivElement>(null) as MutableRefObject<HTMLDivElement>
    // const refRigth = useRef<HTMLDivElement>(null) as MutableRefObject<HTMLDivElement>
    
    // useEffect(()=>{
    //     const resizeEl = refBar.current
    //     const styles = window.getComputedStyle(resizeEl)
    //     let width = parseInt(styles.width, 10)
    //     let x = 0
        
        
    //     const onRightResize = (event: MouseEvent) => {
    //         const dx = event.clientX - x;
    //         x = event.clientX;
    //         width = width + dx;
    //         resizeEl.style.width = `${width}px`;
    // };
        
         
        
    //     const onUpResize = (event:MouseEvent) => {
    //         document.removeEventListener("mousemove", onRightResize)
    //     }
        
    //     const onDownResize = (event:MouseEvent) => {
    //   x = event.clientX;
    //   resizeEl.style.left = styles.left;
    //   resizeEl.style.right = "0";
    //   document.addEventListener("mousemove", onRightResize);
    //   document.addEventListener("mouseup", onUpResize);
    // };

        
    //     const resizer = refRigth.current
    //     resizer.addEventListener('mousedown', onDownResize) 
         
    //     return ()=>{
    //         resizer.removeEventListener('mousedown', onRightResize)
    //     }
    // },[])