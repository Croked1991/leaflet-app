import { LatLngTuple } from "leaflet";
import { FROM, TO } from "../constantes/constantes";

export type JsonType = {
    code: string,
    routes: {
        distance: number,
        duration: number,
        geometry: {
            coordinates: LatLngTuple[],
            type: string
        },
        legs: {
            distance: number,
            duration: number,
            steps:[],
            summary: string,
        }[],
        weight: number,
        weight_name: string
    }[],
    waypoints: {hint:string}[]
    }

export type KindOfPoint = typeof FROM | typeof TO

export type ChangeLeadWorkArgs = {
    leadName:string, 
    newPoint:string, 
    selectType: KindOfPoint
}