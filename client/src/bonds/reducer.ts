import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Bond } from './types';

const initialState: Bond[] = [
    { name: 'Joe', value: 4, notes: 'he okay' },
    { name: 'Moe', value: 1, notes: 'one the rocks\n test' },
];

export const { actions, reducer } = createSlice({
    name: 'bonds',
    initialState,
    reducers: {
        loadInitial: (_state, { payload }: PayloadAction<Bond[]>) => {
            return payload;
        },
        addBond: (state, { payload }: PayloadAction<Bond>) => {
            return [...state, payload];
        },
        modifyBond: (state, { payload }: PayloadAction<Bond>) => {
            const index = state.findIndex((entry) => {
                return entry.name == payload.name;
            });
            console.log(
                index,
                state.map((e) => e),
                payload.name
            );
            if (index > -1) {
                state[index] = payload;
            }
            return state;
        },
    },
});
