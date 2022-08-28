import { JsonType } from "./../../../types/sagas";
import { PayloadAction } from "@reduxjs/toolkit";
import { LatLngTuple } from "leaflet";
import {call, put, takeEvery} from "redux-saga/effects"
import { setNewRoute } from "../../slices/route";




function* getRouteFromAPIWork (action:PayloadAction<LatLngTuple[]>){
    try {
        const waypoints:number[] = yield action.payload.map(e=> e.reverse())
        const url = `https://router.project-osrm.org/route/v1/driving/${waypoints[0]};${waypoints[1]}?geometries=geojson&overview=full`
        const data:Response = yield call(()=> fetch(url))
        const json:JsonType = yield data.json()
        const route:LatLngTuple[] = yield json.routes[0].geometry.coordinates.map((e: number[]) => e.reverse())
        yield put(setNewRoute(route))
    } catch (error) {
        yield console.log(error)
    }
}


export function* getRouteFromAPIWatch(){
    yield takeEvery("route/fetchRoute", getRouteFromAPIWork)
}

