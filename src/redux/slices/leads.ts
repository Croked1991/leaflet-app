import { createSlice } from '@reduxjs/toolkit'
import { access } from 'fs';
import { EKT, KRD, KZN, MSK, SMR, UFA } from './points';


export type Lead = {
    id:number, 
    name: string,
    from: string, 
    to: string
}

export type Leads = {leads: Lead[]}

const initialState:Leads = {leads: [
    {id:1, name: "Заявка 1",from: UFA, to: MSK},
    {id:2, name: "Заявка 2",from: KZN, to: SMR},
    {id:3, name: "Заявка 3",from: EKT, to: KRD}
],
}

export const leadsSlice = createSlice({
    name: 'leads',
    initialState,
    reducers: {
        addNewLead: (state, action: {type:string, payload:Lead}) => {
            state.leads.push(action.payload)
        },
        changeLead: (state, action: {type:string, payload:{leadName:string, newPoint:string, selectType: string}})=>{            
        },
        changeLeadsState: (state, action: {type: string, payload: Lead[]}) => {
            state.leads = action.payload
        },
    }
})

export const {addNewLead, changeLead, changeLeadsState} = leadsSlice.actions
export default leadsSlice.reducer