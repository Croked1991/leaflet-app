import { configureStore } from '@reduxjs/toolkit'
import { points } from './slices/points';
import {leads} from './slices/leads';
import {waypoints} from './slices/waypoints';
import {route} from './slices/route';
import createSagaMiddleware from '@redux-saga/core';
import rootSaga from './sagas/rootSaga';

const saga = createSagaMiddleware()
export const store = configureStore({
  reducer: {
    points: points,
    leads: leads,
    waypoints: waypoints,
    route: route
  },
  middleware: [saga] 
})

export type RootState = ReturnType<typeof store.getState>

saga.run(rootSaga)