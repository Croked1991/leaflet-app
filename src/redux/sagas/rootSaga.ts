import { all } from "redux-saga/effects";
import { getRoute } from "./getRoute";
import { setRouteWatch } from "./setRoute";

export default function* rootSaga() {
    yield all([
        getRoute(),
        setRouteWatch(),
    ])
  }