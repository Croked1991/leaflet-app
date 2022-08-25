import { LatLngTuple } from 'leaflet';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const UFA = "cклад УФА"
export const MSK = "cклад МСК"
export const KZN = "cклад КЗН"
export const SMR = "cклад СМР"
export const EKT = "cклад ЕКБ"
export const KRD = "cклад КРД"

export type Point = {
    id: number,
    name: string,
    latLng: LatLngTuple
}

type Points = { points: Point[] }

const initialState: Points = {
    points: [
        { id: 1, name: UFA, latLng: [54.733979, 55.993847] },
        { id: 2, name: MSK, latLng: [55.567226, 37.642459] },
        { id: 3, name: KZN, latLng: [55.802813, 49.216019] },
        { id: 4, name: SMR, latLng: [53.198627, 50.243782] },
        { id: 5, name: EKT, latLng: [56.775300, 60.584498] },
        { id: 6, name: KRD, latLng: [45.138902, 38.887151] },
    ]
}

export const pointsSlice = createSlice({
    name: 'points',
    initialState,
    reducers: {
        addNewPoint: (state, action: PayloadAction<Point>) => {
            state.points.push(action.payload)
        }
    }
})

export const points = pointsSlice.reducer