import { LatLngTuple } from "leaflet"

export type Lead = {
    id: number,
    name: string,
    from: string,
    to: string
}

export type Leads = {
    leads: Lead[]
}

export type Point = {
    id: number,
    name: string,
    latLng: LatLngTuple
}

export type Points = {
    points: Point[]
}

export type Waypoints = LatLngTuple[] | []

export type Route = {
    route: Waypoints,
    isWrongPoints: boolean,
    isLoading: boolean
}