import { all } from "redux-saga/effects";
import { changeLeadRoutePointsWatch } from "./changeLeadRoutePoints/changeLeadRoutePoints";
import { getRoute } from "./getRoute";
import { setRouteWatch } from "./setRoute";

export default function* rootSaga() {
    yield all([
        getRoute(),
        setRouteWatch(),
        changeLeadRoutePointsWatch()
    ])
  }