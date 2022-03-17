import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Item } from './types';

const initialState: Item[] = [
    { name: 'Riot Helment', description: 'Armor +1' },
];

export const { actions, reducer } = createSlice({
    name: 'inventory',
    initialState,
    reducers: {
        loadInitial: (_state, { payload }: PayloadAction<Item[]>) => {
            return payload;
        },
        addItem: (state, { payload }: PayloadAction<Item>) => {
            return [...state, payload];
        },
        updateItem: (
            state,
            {
                payload: { index, item },
            }: PayloadAction<{ index: number; item: Item }>
        ) => {
            state[index] = item;
        },
        removeItem: (state, { payload }: PayloadAction<number>) => {
            console.log(state.splice(payload, 1), payload);
            state = state.slice(payload, 1);
        },
    },
});
