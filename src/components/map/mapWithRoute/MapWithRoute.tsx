import { Icon} from "leaflet"
import React, { FC } from "react"
import { MapContainer, Marker, Polyline, TileLayer } from "react-leaflet"
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import style from "../../../styles/styles.module.css"
import { MapWithRouteType } from "../../../types/map"


const icon = new Icon(
    {
        iconUrl: markerIconPng,
        iconSize: [25, 41],
        iconAnchor: [12, 41]
    }
)

export const MapWithRoute: FC<MapWithRouteType> = ({ center, route}) => {
    
    const fromPoint = route[0]
    const toPoint = route[route.length - 1]

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
            <Polyline pathOptions={{ weight: 8 }} positions={route} />
            <Marker icon={icon} position={fromPoint} />
            <Marker icon={icon} position={toPoint} />
        </MapContainer>
    )
}
