import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { reducer as statsReducer } from './stats';
import { reducer as skillsReducer } from './skills';
import { reducer as bondReducer } from './bonds';
import { reducer as inventoryReducer } from './inventory';
import { reducer as pointsReducer } from './points';

export const store = configureStore({
    reducer: combineReducers({
        stats: statsReducer,
        skills: skillsReducer,
        bonds: bondReducer,
        inventory: inventoryReducer,
        points: pointsReducer,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

store.subscribe(() => {
    console.log(store.getState());
});
