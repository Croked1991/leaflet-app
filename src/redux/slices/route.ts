import { LatLngExpression, LatLngTuple } from "leaflet";
import { createSlice, PayloadAction } from '@reduxjs/toolkit'


type Route = {route: LatLngTuple[]}



const initialState:Route = {route: [
    [0, 0],
    [0, 0]
]}

export const routeSlice = createSlice({
    name: 'route',
    initialState,
    reducers: {
            fetchRoute: (state, action:{type:string, payload: LatLngTuple[]})=>{
                console.log("...loading")
            },
            getPointsForNewRoute: (state, action:{type:string, payload: string[]}) => {
            },
            setNewRoute: (state, action: PayloadAction<LatLngTuple[]>) => {
                state.route = action.payload
            }
        }
    }
)

export const {fetchRoute, getPointsForNewRoute,setNewRoute} = routeSlice.actions
export default routeSlice.reducer