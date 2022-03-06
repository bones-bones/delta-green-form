import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { reducer as stats } from './stats';
import { reducer as skills } from './skills';
import { reducer as bondReducer } from './bonds';
import { reducer as inventoryReducer } from './inventory';
import { reducer as pointsReducer } from './points';
import { reducer as notifications } from './notifications';

export const store = configureStore({
    reducer: combineReducers({
        stats,
        skills,
        bonds: bondReducer,
        inventory: inventoryReducer,
        points: pointsReducer,
        notifications,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

store.subscribe(() => {
    console.log(store.getState());
});
