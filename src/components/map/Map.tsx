import { MapContainer, Marker, Polyline, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "@react-leaflet/core"
import { useAppSelector } from "../../hooks/useAppSelector";
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import { Icon, LatLngExpression } from 'leaflet'

const icon = new Icon(
    {
        iconUrl: markerIconPng,
        iconSize: [25, 41],
        iconAnchor: [12, 41]
    }
)

export const Map = () => {

    const route = useAppSelector(store => store.route.route)
    const fromPoint = route[0]
    const toPoint = route[route.length - 1]
    const mapCenter: LatLngExpression = [54.735360, 55.985491]

    if (route.length) {
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
                <Polyline pathOptions={{ weight: 8 }} positions={route} />
                <Marker icon={icon} position={fromPoint} />
                <Marker icon={icon} position={toPoint} />
            </MapContainer>
        );
    } else {
        return (
            <MapContainer
                zoom={13}
                scrollWheelZoom={true}
                center={mapCenter}
                id="map"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </MapContainer>
        )
    }

};
