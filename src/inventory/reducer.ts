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
        removeItem: (
            state,
            { payload }: PayloadAction<{ name: string; count?: number }>
        ) => {
            const remaining = state.find((entry) => {
                return entry.name == payload.name;
            });

            if (remaining) {
                if (remaining.count) {
                    remaining.count--;
                }

                return [
                    ...state.filter(
                        (entry) => !entry || (entry.count && entry.count > 0)
                    ),
                ];
            }
        },
    },
});
