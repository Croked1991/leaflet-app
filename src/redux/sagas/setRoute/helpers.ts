import { Point } from "./../../../types/slices";
import { KindOfPoint } from "./../../../types/sagas";
import { PayloadAction } from "@reduxjs/toolkit";
import { put } from "redux-saga/effects";
import { LatLngTuple } from "leaflet";
import { fetchRoute } from "../../slices/route";


function* setFromPoint(
    ifOnePointArray: Point[],
    route: LatLngTuple[]
) {
    const firstPoint: LatLngTuple = yield ifOnePointArray[0].latLng
    const newRoute: LatLngTuple[] = yield [[...firstPoint], [...route[route.length - 1]]]
    yield put(fetchRoute(newRoute));
}

function* setToPoint(
    ifOnePointArray: Point[],
    route: LatLngTuple[]
) {
    const secondPoint: LatLngTuple = yield ifOnePointArray[0].latLng
    const newRoute: LatLngTuple[] = yield [[...route[0]], [...secondPoint]]
    yield put(fetchRoute(newRoute));
}

function* setOnePoint(
    action: PayloadAction<{ points: string[], selectType?: KindOfPoint }>,
    ifOnePointArray: Point[],
    route: LatLngTuple[]
) {
    if (action.payload.selectType === "from") {
        yield setFromPoint(ifOnePointArray, route)
    } else {
        yield setToPoint(ifOnePointArray, route)
    }
}

function* setBothPoints(
    ifOnePointArray: Point[],
    ifTwoPointArray: Point[]
) {
    const firstPoint: LatLngTuple = yield ifOnePointArray[0].latLng
    const secondPoint: LatLngTuple = yield ifTwoPointArray[0].latLng
    const newRoute: LatLngTuple[] = yield [[...firstPoint], [...secondPoint]]
    yield put(fetchRoute(newRoute));
}

export function* setRoute(
    action: PayloadAction<{ points: string[], selectType?: KindOfPoint }>,
    ifOnePointArray: Point[],
    ifTwoPointArray: Point[],
    route: LatLngTuple[]
) {
    if (action.payload.points.length === 2) {
        yield setBothPoints(ifOnePointArray, ifTwoPointArray)
    } else {
        yield setOnePoint(action, ifOnePointArray, route)
    }
}