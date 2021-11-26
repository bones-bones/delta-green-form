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
    bonds:Bond[]
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
    bonds:[]
};

type DerivedStat = {
    max: number;
    current: number;
};
type Bond={
    name:string
    score:number
    history?:string
}

export const { actions, reducer } = createSlice({
    name: 'battle',
    initialState: initState,
    reducers: {
        loadInitial: (
            state,
            { payload }: PayloadAction<typeof initState['stats']>
        ) => {
            state.stats = { ...payload };
            const hp = Math.ceil(
                (payload.strength.value + payload.constitution.value) / 2
            );
            const wp = payload.will.value;
            const san = payload.will.value * 5;
            const breakingPoint = san - payload.will.value;
            state.derivedStats = {
                hp: {
                    max: hp,
                    current: hp,
                },
                wp: { max: wp, current: wp },
                sanity: { max: san, current: san },
                breakingPoint: { max: breakingPoint, current: breakingPoint },
            };
        },
        loadBonds:(state, {payload}:PayloadAction<Bond[]>)=>{
            state.bonds=payload
        }
    },
});
