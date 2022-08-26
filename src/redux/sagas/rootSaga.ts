import { all } from "redux-saga/effects";
import { changeLeadRoutePointsWatch } from "./changeLeadRoutePoints/changeLeadRoutePoints";
import { getRouteFromAPIWatch } from "./getRouteFromAPI/getRouteFromAPI";
import { setRouteWatch } from "./setRoute/setRoute";

export default function* rootSaga() {
    yield all([
        getRouteFromAPIWatch(),
        setRouteWatch(),
        changeLeadRoutePointsWatch()
    ])
  }