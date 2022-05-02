import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StatTypes } from '../custom-sheet';

const initState: {
    stats: {
        [key in StatTypes]: {
            value: number;
            description?: '';
        };
    };
    derivedStats: {
        hp: DerivedStat;
        wp: DerivedStat;
        sanity: DerivedStat;
        breakingPoint: DerivedStat;
    };
    bonds: Bond[];
} = {
    stats: {
        strength: { value: 0 },
        constitution: { value: 0 },
        dexterity: { value: 0 },
        intelligence: { value: 0 },
        will: { value: 0 },
        charisma: { value: 0 },
    },
    derivedStats: {
        hp: { max: 0, current: 0 },
        wp: { max: 0, current: 0 },
        sanity: { max: 0, current: 0 },
        breakingPoint: { max: 0, current: 0 },
    },
    bonds: [],
};

type DerivedStat = {
    max: number;
    current: number;
};
type Bond = {
    name: string;
    score: number;
    history?: string;
};

export const { actions, reducer } = createSlice({
    name: 'stats',
    initialState: initState,
    reducers: {
        loadInitial: (
            state,
            { payload }: PayloadAction<typeof initState['stats']>
        ) => {
            state.stats = { ...payload };
        },
        setHp: (state, { payload }: PayloadAction<number>) => {
            state.derivedStats.hp.current = payload;
        },
        setWp: (state, { payload }: PayloadAction<number>) => {
            state.derivedStats.wp.current = payload;
        },
    },
});
