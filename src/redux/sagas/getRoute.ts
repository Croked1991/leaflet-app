import { LatLngTuple } from 'leaflet';
import {call, put, takeEvery} from "redux-saga/effects"
import { setNewRoute } from '../slices/route';




function* getRouteFetch (action:{type:string, payload: LatLngTuple[]}): any{
    try {
        yield console.log(action.payload)
        const waypoints = yield action.payload.map(e=> e.reverse())
        const data = yield call(()=> fetch(`https://router.project-osrm.org/route/v1/driving/${waypoints[0]};${waypoints[1]}?geometries=geojson&overview=full`))
        const json = yield data.json()
        const routePoints = yield json.routes[0].geometry.coordinates.map((e: number[]) => e.reverse())
        yield put(setNewRoute(routePoints))
    } catch (error) {
        yield console.log(error)
    }
}


export function* getRoute(){
    yield takeEvery('route/fetchRoute', getRouteFetch)
}

