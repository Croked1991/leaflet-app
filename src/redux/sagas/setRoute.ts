import { store } from './../index';
import { Point } from './../slices/points';
import { useAppSelector } from './../../hooks/useAppSelector';
import { LatLngTuple } from 'leaflet';
import { put, takeEvery} from "redux-saga/effects"
import { fetchRoute, setNewRoute } from '../slices/route';






function* setRouteWork (action:{type:string, payload: string[]}): any{
    const points = yield store.getState().points.points
    const firstArr:Point[] = yield points.filter((e:Point)=>e.name===action.payload[0])
    const secondArr:Point[] = yield points.filter((e:Point)=>e.name===action.payload[1])
    const firstPoint:LatLngTuple = yield firstArr[0].latLng
    const secondPoint:LatLngTuple = yield secondArr[0].latLng
    const currentRoute:LatLngTuple[] = yield [[...firstPoint], [...secondPoint]]
    yield put(fetchRoute(currentRoute));
}


export function* setRouteWatch(){
    yield takeEvery('route/getPointsForNewRoute', setRouteWork)
}

