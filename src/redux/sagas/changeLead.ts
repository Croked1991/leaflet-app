import { Point } from './../slices/points';
import { store } from './../index';
import { LatLngTuple } from 'leaflet';
import {call, put, takeEvery} from "redux-saga/effects"
import { setNewRoute } from '../slices/route';




function* changeLeadWork (action:{type:string, payload: {leadName:string, newPoint:string, selectType: string}}): any{
    const leads = yield store.getState().leads.leads
    yield leads.filter((el:Point)=> el.name === action.payload.leadName)
}


export function* changeLeadWatch(){
    yield takeEvery('leads/changeLead', changeLeadWork)
}

