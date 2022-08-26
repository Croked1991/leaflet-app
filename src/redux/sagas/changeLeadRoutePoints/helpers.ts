import { PayloadAction } from "@reduxjs/toolkit"
import { put } from "redux-saga/effects"
import { FROM } from "../../../constantes/constantes"
import { changeLeadsState, Lead } from "../../slices/leads"
import { setIsWrongPoints } from "../../slices/route"
import { ChangeLeadWorkArgs, KindOfPoint } from "./changeLeadRoutePoints"



function* showError(){
            yield alert('Ошибка: точки погрузки - разгрузки должны быть разными')
            yield put(setIsWrongPoints(true))
}

function* putNewLeads(   
    kindOfPoint:KindOfPoint, 
    newLeads:Lead[],
    leadIndex:number, 
    action:PayloadAction<ChangeLeadWorkArgs>){
            const changedLead:Lead = yield {...newLeads[leadIndex], [kindOfPoint]:action.payload.newPoint}
            yield newLeads.splice(leadIndex, 1, changedLead)
            yield put(changeLeadsState(newLeads))
}

function* changeFromPoint(
    kindOfPoint:KindOfPoint, 
    newLeads:Lead[],
    leadIndex:number, 
    action:PayloadAction<ChangeLeadWorkArgs>){
        if (newLeads[leadIndex].to ===  action.payload.newPoint) {
            yield showError()
        } else {
            yield putNewLeads(kindOfPoint,newLeads,leadIndex,action)
        }  
}

function* changeToPoint(
    kindOfPoint:KindOfPoint, 
    newLeads:Lead[],
    leadIndex:number, 
    action:PayloadAction<ChangeLeadWorkArgs>
){
        if (newLeads[leadIndex].from ===  action.payload.newPoint) {
            yield showError()
    } else {
            yield putNewLeads(kindOfPoint,newLeads,leadIndex,action)
    }
}



export function* changeLeadRoute (
    kindOfPoint:KindOfPoint, 
    newLeads:Lead[],
    leadIndex:number, 
    action:PayloadAction<ChangeLeadWorkArgs>){
        if (kindOfPoint ===  FROM) 
            yield changeFromPoint(kindOfPoint, newLeads, leadIndex, action)
         else {
            yield changeToPoint(kindOfPoint, newLeads, leadIndex, action)
        }
    }
