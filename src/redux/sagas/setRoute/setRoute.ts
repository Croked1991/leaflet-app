import { Point } from "./../../../types/slices";
import { KindOfPoint } from "./../../../types/sagas";
import { store } from "../../index";
import { LatLngTuple } from "leaflet";
import { takeLatest } from "redux-saga/effects"
import { PayloadAction } from "@reduxjs/toolkit";
import { setRoute } from "./helpers";



function* setRouteWork(action: PayloadAction<{ points: string[], selectType?: KindOfPoint }>) {
    const points: Point[] = yield store.getState().points.points
    const ifOnePointArray: Point[] = yield points.filter((e: Point) => e.name === action.payload.points[0])
    const ifTwoPointArray: Point[] = yield points.filter((e: Point) => e.name === action.payload.points[1])
    const route: LatLngTuple[] = yield store.getState().route.route
    yield setRoute(action, ifOnePointArray, ifTwoPointArray, route)
}


export function* setRouteWatch() {
    yield takeLatest("route/getPointsForNewRoute", setRouteWork)
}

