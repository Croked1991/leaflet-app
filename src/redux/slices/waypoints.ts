import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Waypoints } from "../../types/slices";


const initialState: Waypoints = []

export const waypointsSlice = createSlice({
    name: "waypoints",
    initialState,
    reducers: {
        setNewWaypoints: (state, action: PayloadAction<Waypoints>) => {
            state = action.payload
        }
    }
})

export const { setNewWaypoints } = waypointsSlice.actions
export const waypoints = waypointsSlice.reducer