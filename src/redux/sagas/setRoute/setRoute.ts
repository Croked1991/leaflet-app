import { store } from '../../index';
import { Point } from '../../slices/points';
import { LatLngTuple } from 'leaflet';
import { put, takeEvery} from "redux-saga/effects"
import { fetchRoute } from '../../slices/route';
import { KindOfPoint } from '../changeLeadRoutePoints/changeLeadRoutePoints';
import { PayloadAction } from '@reduxjs/toolkit';


function* setFromPoint (
    ifOnePointArray:Point[],
    route:LatLngTuple[]
) {
     const firstPoint:LatLngTuple = yield ifOnePointArray[0].latLng
     const newRoute:LatLngTuple[] = yield [[...firstPoint],[...route[route.length - 1]]]
     yield put(fetchRoute(newRoute));                
}

function* setToPoint (
    ifOnePointArray:Point[],
    route:LatLngTuple[]
) {
        const secondPoint:LatLngTuple = yield ifOnePointArray[0].latLng
        const newRoute:LatLngTuple[] = yield [[...route[0]],[...secondPoint]]
    yield put(fetchRoute(newRoute)); 
}


function* setOnePoint (
    action:PayloadAction<{points:string[], selectType?:KindOfPoint}>,
    ifOnePointArray:Point[],
    route:LatLngTuple[]
) {
    if(action.payload.selectType === "from") {
       yield setFromPoint(ifOnePointArray, route)
                } else {
        yield setToPoint(ifOnePointArray, route)
                }
}
//вот здесь остановился

function* setBothPoints ( ifOnePointArray:Point[],ifTwoPointArray:Point[] ) {
        const firstPoint:LatLngTuple = yield ifOnePointArray[0].latLng
        const secondPoint:LatLngTuple = yield ifTwoPointArray[0].latLng
        const newRoute:LatLngTuple[] = yield [[...firstPoint], [...secondPoint]]
        yield put(fetchRoute(newRoute));
}


function* setRoute (
    action:PayloadAction<{points:string[], selectType?:KindOfPoint}>,
    ifOnePointArray:Point[],
    ifTwoPointArray:Point[],
    route:LatLngTuple[]
){
    if(action.payload.points.length === 2) {
           yield setBothPoints(ifOnePointArray,ifTwoPointArray)
        } else {           
           yield setOnePoint(action, ifOnePointArray, route)
        }
}


function* setRouteWork (action:PayloadAction<{points:string[], selectType?:KindOfPoint}>) {
        const points: Point[] = yield store.getState().points.points
        const ifOnePointArray:Point[] = yield points.filter((e:Point)=>e.name===action.payload.points[0])
        const ifTwoPointArray:Point[] = yield points.filter((e:Point)=>e.name===action.payload.points[1])
        const route:LatLngTuple[] = yield store.getState().route.route
        yield setRoute(action, ifOnePointArray, ifTwoPointArray, route)
}


export function* setRouteWatch(){
    yield takeEvery('route/getPointsForNewRoute', setRouteWork)
}

