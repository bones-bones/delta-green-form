import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { actions as statActions } from '../stats';

const initialState = {
    hp: { current: 0, max: 0 },
    wp: { current: 0, max: 0 },
    sp: { current: 0, max: 0 },
    bp: 0,
};

export const { actions, reducer } = createSlice({
    name: 'points',
    initialState,
    reducers: {
        hpSet: (state, { payload }: PayloadAction<number>) => {
            state.hp.current = payload;
        },
        wpSet: (state, { payload }: PayloadAction<number>) => {
            state.wp.current = payload;
        },
        spSet: (state, { payload }: PayloadAction<number>) => {
            state.sp.current = payload;
        },
    },
    extraReducers: {
        [statActions.loadInitial.type]: (_state, { payload }) => {
            const hp = Math.ceil(
                (payload.strength.value + payload.constitution.value) / 2
            );
            const wp = payload.will.value;
            const san = payload.will.value * 5;
            const breakingPoint = san - payload.will.value;
            return {
                hp: {
                    max: hp,
                    current: hp,
                },
                wp: { max: wp, current: wp },
                sp: { max: san, current: san },
                bp: breakingPoint,
            };
        },
    },
});
