import { LatLngExpression, LatLngTuple } from "leaflet";
import { createSlice } from '@reduxjs/toolkit'


type Waypoints = LatLngTuple[]



const initialState:Waypoints = [
    [54.735526, 55.983500],
    [54.739428, 55.973093]
]

export const waypointsSlice = createSlice({
    name: 'waypoints',
    initialState,
    reducers: {
            setNewWaypoints: (state, action:{type:string, payload:Waypoints}) => {
                state = action.payload
            }
        }
    }
)

export const {setNewWaypoints} = waypointsSlice.actions
export default waypointsSlice.reducer