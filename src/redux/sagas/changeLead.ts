import { PayloadAction } from '@reduxjs/toolkit';
import { Point } from './../slices/points';
import { store } from './../index';
import {put, PutEffect, PutEffectDescriptor, SimpleEffect, takeEvery} from "redux-saga/effects"
import { changeLeadsState, Lead } from '../slices/leads';
import { setIsWrongPoints } from '../slices/route';


type ChangeLeadWorkArgs = {
    leadName:string, 
    newPoint:string, 
    selectType: "from"|"to"
}

 

function* changeLeadWork (action:PayloadAction<ChangeLeadWorkArgs>): any{
    yield put(setIsWrongPoints(false))
    const fromTo: "from" | "to" = action.payload.selectType
    const leads:Lead[] = yield [...store.getState().leads.leads]
    const leadIndex:number = yield leads.findIndex((el)=> el.name === action.payload.leadName)
        if (fromTo ===  "from") {
            if (leads[leadIndex].to ===  action.payload.newPoint) {
                yield alert('Ошибка: точки погрузки - разгрузки должны быть разными')
                yield put(setIsWrongPoints(true))
            } else {
                    const changedLead:Lead = yield {...leads[leadIndex], [fromTo]:action.payload.newPoint}
                    yield leads.splice(leadIndex, 1, changedLead)
                    yield put(changeLeadsState(leads))
            }  
      } else {
           if (leads[leadIndex].from ===  action.payload.newPoint) {
                yield alert('Ошибка: точки погрузки - разгрузки должны быть разными')
                yield put(setIsWrongPoints(false))  
            } else {
                    const changedLead:Lead = yield {...leads[leadIndex], [fromTo]:action.payload.newPoint}
                    yield leads.splice(leadIndex, 1, changedLead)
                    yield put(changeLeadsState(leads))
      }
}
}

export function* changeLeadWatch(){
    yield takeEvery('leads/changeLead', changeLeadWork)
}



