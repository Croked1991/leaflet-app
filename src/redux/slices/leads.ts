import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EKT, KRD, KZN, MSK, SMR, UFA } from './points';


export type Lead = {
    id: number,
    name: string,
    from: string,
    to: string
}

export type Leads = { leads: Lead[] }

type ChangeLead = {
    leadName: string,
    newPoint: string,
    selectType: string
}

const initialState: Leads = {
    leads: [
        { id: 1, name: "Заявка 1", from: UFA, to: MSK },
        { id: 2, name: "Заявка 2", from: KZN, to: SMR },
        { id: 3, name: "Заявка 3", from: EKT, to: KRD }
    ],
}

export const leadsSlice = createSlice({
    name: 'leads',
    initialState,
    reducers: {
        addNewLead: (state, action: PayloadAction<Lead>) => {
            state.leads.push(action.payload)
        },
        changeLead: (state, action: PayloadAction<ChangeLead>) => {
        },
        changeLeadsState: (state, action: PayloadAction<Lead[]>) => {
            state.leads = action.payload
        },
    }
})

export const { addNewLead, changeLead, changeLeadsState } = leadsSlice.actions
export const leads = leadsSlice.reducer