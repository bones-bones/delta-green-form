import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { reducer as stats } from './stats';
import { reducer as skills } from './skills';
import { reducer as bondReducer } from './bonds';
import { reducer as inventoryReducer } from './inventory';
import { reducer as pointsReducer } from './points';
import { reducer as notifications } from './notifications';
import { reducer as network } from './rtc/reducer';

export const store = configureStore({
    reducer: combineReducers({
        stats,
        skills,
        bonds: bondReducer,
        inventory: inventoryReducer,
        points: pointsReducer,
        notifications,
        network,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
let notificationRef: any;
store.subscribe(() => {
    console.log(store.getState());

    if (notificationRef == store.getState().notifications) {
        store
            .getState()
            .network.channel?.send(JSON.stringify(store.getState().points));
    }
    notificationRef = store.getState().notifications;
});
