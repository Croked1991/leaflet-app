import { UseResize } from "./../types/hooks";
import { useRef, useCallback, useEffect, useState,  } from "react";


export const useResize = (): UseResize => {

    const refSideBar = useRef<HTMLDivElement>(null);
    const [isResizing, setIsResizing] = useState(false);
    const [sidebarWidth, setSidebarWidth] = useState(0);

    const startResizing = useCallback(() => {
        setIsResizing(true);
    }, []);

    const stopResizing = useCallback(() => {
        setIsResizing(false);
    }, []);

    const resize = useCallback(
        (mouseMoveEvent: MouseEvent) => {
            if (isResizing && refSideBar.current) {
                setSidebarWidth(
                    mouseMoveEvent.clientX -
                    refSideBar.current.getBoundingClientRect().left
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

    return [refSideBar, sidebarWidth, startResizing]
}