import { Route } from "./../../types/slices";
import { LatLngTuple } from "leaflet";
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { KindOfPoint } from "../../types/sagas";


const initialState: Route = {
    route: [],
    isWrongPoints: false,
    isLoading: false
}

export const routeSlice = createSlice({
    name: "route",
    initialState,
    reducers: {
        setIsWrongPoints: (state, action: PayloadAction<boolean>) => {
            state.isWrongPoints = action.payload
        },
        fetchRoute: (state, action: PayloadAction<LatLngTuple[]>) => {
            state.isLoading = true
        },
        getPointsForNewRoute: (state, action: PayloadAction<{ points: string[], selectType?: KindOfPoint }>) => {
        },
        setNewRoute: (state, action: PayloadAction<LatLngTuple[]>) => {
            if (!state.isWrongPoints) { 
                state.route = action.payload
                state.isLoading = false           
            }
        }
    }
})

export const { fetchRoute, getPointsForNewRoute, setNewRoute, setIsWrongPoints } = routeSlice.actions
export const route = routeSlice.reducer