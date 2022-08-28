import { LatLngExpression } from "leaflet";
import { Waypoints } from "./slices";

export type ClearMapType = {
    center: LatLngExpression
}

export type MapWithRouteType = {
    center: LatLngExpression
    route: Waypoints
}