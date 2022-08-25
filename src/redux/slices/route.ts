import { LatLngTuple } from "leaflet";
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { store } from "..";


type Route = {route: LatLngTuple[], isWrongPoints:boolean}



const initialState:Route = {route: [
    [43, 44],
    [45, 46]
],
isWrongPoints: false}

export const routeSlice = createSlice({
    name: 'route',
    initialState,
    reducers: {
            setIsWrongPoints: (state, action:{type:string, payload: {isWrongPoints: boolean}})=>{
                state.isWrongPoints = action.payload.isWrongPoints
            },
            fetchRoute: (state, action:{type:string, payload: LatLngTuple[]})=>{
                console.log("...loading")
            },
            getPointsForNewRoute: (state, action:{type:string, payload:{points:string[], selectType?:"from" | "to"}}) => {
            },
            setNewRoute: (state, action: PayloadAction<LatLngTuple[]>) => {
                if (!state.isWrongPoints){state.route = action.payload}
            }
        }
    }
)

export const {fetchRoute, getPointsForNewRoute,setNewRoute,setIsWrongPoints} = routeSlice.actions
export default routeSlice.reducer