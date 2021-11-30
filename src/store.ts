import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { reducer as statsReducer } from './stats';
import {reducer as pointsReducer} from './points'

export const store = configureStore({
    reducer: combineReducers({
        stats: statsReducer,
        points:pointsReducer
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
