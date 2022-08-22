import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { reducer as stats } from './stats';
import { reducer as skills } from './skills';
import { reducer as bondReducer } from './bonds';
import { reducer as inventoryReducer } from './inventory';
import { reducer as pointsReducer } from './points';
import { reducer as notifications } from './notifications';
import { reducer as network } from './rtc/reducer';
import { reducer as personData } from './person-data/reducer';

export const store = configureStore({
    reducer: combineReducers({
        stats,
        skills,
        bonds: bondReducer,
        inventory: inventoryReducer,
        points: pointsReducer,
        notifications,
        network,
        personData,
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
            .network.channel?.send(
                JSON.stringify({
                    derivedStats: store.getState().points,
                    personData: store.getState().personData,
                })
            );
    }
    notificationRef = store.getState().notifications;
});
