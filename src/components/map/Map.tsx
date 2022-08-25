import { MapContainer, Marker, Polyline, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import "@react-leaflet/core"
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { fetchRoute } from "../../redux/slices/route";
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import {Icon} from 'leaflet'

const icon = new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]})






export const Map = () => {

    const route = useAppSelector(store => store.route.route )
    const dispatch = useAppDispatch()
   
   

    useEffect(()=>{
        dispatch(fetchRoute(
            [[46, 46],
            [46, 47]]
        ))
    }, [dispatch])
    

    return (
        <MapContainer
            zoom={13}
            scrollWheelZoom={true}
            center={[54.735360, 55.985491]}
            id="map"
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Polyline pathOptions={{weight: 8}} positions={route} />
            <Marker icon={icon} position={route[0]} />
            <Marker icon={icon} position={route[route.length - 1]} />
        </MapContainer>
    );
};
