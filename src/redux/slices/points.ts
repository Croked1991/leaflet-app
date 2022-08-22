import { LatLngTuple } from 'leaflet';
import { createSlice } from '@reduxjs/toolkit'

export const UFA = "cклад Уфа"
export const MSK = "cклад Москва"
export const KZN = "cклад Казань"
export const SMR = "cклад Самара"
export const EKT = "cклад Екатеринбург"
export const KRD = "cклад Краснодар"

export type Point = {
    id: number, 
    name: string, 
    latLng: LatLngTuple
}

type Points = {points: Point[]}

const initialState:Points = {points:[
    {id:1, name: UFA, latLng:[54.733979, 55.993847]},
    {id:2, name: MSK, latLng:[55.567226, 37.642459]},
    {id:3, name: KZN, latLng:[55.802813, 49.216019]},
    {id:4, name: SMR, latLng:[53.198627, 50.243782]},
    {id:5, name: EKT, latLng:[56.775300, 60.584498]},
    {id:6, name: KRD, latLng:[45.138902, 38.887151]},
]}

export const pointsSlice = createSlice({
    name: 'points',
    initialState,
    reducers: {
        addNewPoint: (state, action: {type:string, payload:Point}) => {
            state.points.push(action.payload)
        }
    }
})

export default pointsSlice.reducer