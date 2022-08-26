import { PayloadAction } from '@reduxjs/toolkit';
import { store } from './../index';
import {put, takeEvery} from "redux-saga/effects"
import { changeLeadsState, Lead } from '../slices/leads';
import { setIsWrongPoints } from '../slices/route';
import {FROM, TO} from '../../constantes/constantes'
import { changeLeadRoute } from './helpers'




export type KindOfPoint = typeof FROM | typeof TO

export type ChangeLeadWorkArgs = {
    leadName:string, 
    newPoint:string, 
    selectType: KindOfPoint
}


 
 

function* changeLeadRoutePointsWork (action:PayloadAction<ChangeLeadWorkArgs>){
    yield put(setIsWrongPoints(false))
    const kindOfPoint: KindOfPoint = action.payload.selectType
    const newLeads:Lead[] = yield [...store.getState().leads.leads]
    const leadIndex:number = yield newLeads.findIndex((el)=> el.name === action.payload.leadName)
    yield changeLeadRoute(kindOfPoint, newLeads, leadIndex, action)
}



export function* changeLeadRoutePointsWatch(){
    yield takeEvery('leads/changeLead', changeLeadRoutePointsWork)
}



