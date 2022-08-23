import { all } from "redux-saga/effects";
import { changeLeadWatch } from "./changeLead";
import { getRoute } from "./getRoute";
import { setRouteWatch } from "./setRoute";

export default function* rootSaga() {
    yield all([
        getRoute(),
        setRouteWatch(),
        changeLeadWatch()
    ])
  }