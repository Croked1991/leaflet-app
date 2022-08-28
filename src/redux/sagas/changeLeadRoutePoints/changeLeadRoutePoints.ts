import { Lead } from "./../../../types/slices";
import { KindOfPoint } from "./../../../types/sagas";
import { PayloadAction } from "@reduxjs/toolkit";
import { store } from "../../index";
import {put, takeEvery} from "redux-saga/effects"
import { setIsWrongPoints } from "../../slices/route";
import { changeLeadRoute } from "./helpers"
import { ChangeLeadWorkArgs } from "../../../types/sagas";




function* changeLeadRoutePointsWork (action:PayloadAction<ChangeLeadWorkArgs>){
    yield put(setIsWrongPoints(false))
    const kindOfPoint: KindOfPoint = action.payload.selectType
    const newLeads:Lead[] = yield [...store.getState().leads.leads]
    const leadIndex:number = yield newLeads.findIndex((el)=> el.name === action.payload.leadName)
    yield changeLeadRoute(kindOfPoint, newLeads, leadIndex, action)
}

export function* changeLeadRoutePointsWatch(){
    yield takeEvery("leads/changeLead", changeLeadRoutePointsWork)
}



