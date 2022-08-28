import { Spin } from "antd"
import React, { FC } from "react"
import { MapContainer, TileLayer } from "react-leaflet"
import { useAppSelector } from "../../../hooks/useAppSelector"
import style from "../../../styles/styles.module.css"
import { ClearMapType } from "../../../types/map"


export const ClearMap: FC<ClearMapType>  = ({center}) => {
    
    const isLoading = useAppSelector(store => store.route.isLoading)
    
    if (isLoading) {
        return (
            <MapContainer
                zoom={5}
                scrollWheelZoom={true}
                center={center}
                className={style.map}
            >
                <TileLayer
                    attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <div className={style.spin}>
                    <Spin size="large"/>
                </div>
            </MapContainer>
        )
    } else {
        return (
            <MapContainer
                zoom={5}
                scrollWheelZoom={true}
                center={center}
                className={style.map}
            >
                <TileLayer
                    attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </MapContainer>
        )
    }
    
}
