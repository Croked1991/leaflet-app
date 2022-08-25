import { store } from './../index';
import { Point } from './../slices/points';
import { LatLngTuple } from 'leaflet';
import { put, takeEvery} from "redux-saga/effects"
import { fetchRoute } from '../slices/route';






function* setRouteWork (action:{type:string, payload:{points:string[], selectType?:"from" | "to"}}): any{
        const points: Point[] = yield store.getState().points.points
        const firstArr:Point[] = yield points.filter((e:Point)=>e.name===action.payload.points[0])
        if(action.payload.points.length === 2) {
        const secondArr:Point[] = yield points.filter((e:Point)=>e.name===action.payload.points[1])
        const firstPoint:LatLngTuple = yield firstArr[0].latLng
        const secondPoint:LatLngTuple = yield secondArr[0].latLng
        const newRoute:LatLngTuple[] = yield [[...firstPoint], [...secondPoint]]
        yield put(fetchRoute(newRoute));
    } else {
        const route:LatLngTuple[] = yield store.getState().route.route
            if(action.payload.selectType === "from") {
                const firstPoint:LatLngTuple = yield firstArr[0].latLng
                const newRoute:LatLngTuple[] = yield [[...firstPoint],[...route[route.length - 1]]]
                yield put(fetchRoute(newRoute));
            } else {
                const secondPoint:LatLngTuple = yield firstArr[0].latLng
                const newRoute:LatLngTuple[] = yield [[...route[0]],[...secondPoint]]
                yield put(fetchRoute(newRoute));
            }
    }
}


export function* setRouteWatch(){
    yield takeEvery('route/getPointsForNewRoute', setRouteWork)
}

