import { MapContainer, Marker, Polyline, TileLayer, useMap, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import "@react-leaflet/core"
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { fetchRoute, setNewRoute } from "../../redux/slices/route";






export const Map = () => {

    const route = useAppSelector(store => store.route.route )
    const dispatch = useAppDispatch()

   
    

    useEffect(()=>{
        dispatch(fetchRoute(
            [[54.735526, 55.983500],
            [54.739428, 55.973093]]
        ))
    }, [dispatch])

    console.log(route);
    

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
        </MapContainer>
    );
};
