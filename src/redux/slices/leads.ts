import { Lead } from "./../../types/slices";
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Leads } from "../../types/slices";
import { EKT, KRD, KZN, MSK, SMR, UFA } from "../../constantes/constantes";
import { ChangeLeadWorkArgs } from "../../types/sagas";


const initialState: Leads = {
    leads: [
        { id: 1, name: "Заявка 1", from: UFA, to: MSK },
        { id: 2, name: "Заявка 2", from: KZN, to: SMR },
        { id: 3, name: "Заявка 3", from: EKT, to: KRD },
        { id: 4, name: "Заявка 4", from: KZN, to: KRD },
        { id: 5, name: "Заявка 5", from: SMR, to: MSK },
    ],
}

export const leadsSlice = createSlice({
    name: "leads",
    initialState,
    reducers: {
        addNewLead: (state, action: PayloadAction<Lead>) => {
            state.leads.push(action.payload)
        },
        changeLead: (state, action: PayloadAction<ChangeLeadWorkArgs>) => {
        },
        changeLeadsState: (state, action: PayloadAction<Lead[]>) => {
            state.leads = action.payload
        },
    }
})

export const { addNewLead, changeLead, changeLeadsState } = leadsSlice.actions
export const leads = leadsSlice.reducer