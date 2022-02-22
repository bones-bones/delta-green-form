import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { reducer as statsReducer } from './stats';
import { reducer as skillsReducer } from './skills';
import { reducer as bondReducer } from './bonds';

export const store = configureStore({
    reducer: combineReducers({
        stats: statsReducer,
        skills: skillsReducer,
        bonds: bondReducer,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
