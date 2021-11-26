import { RootState } from '../store';

export const selectStats = (state: RootState) => state.stats.stats;

export const selectDerivedStats = (state: RootState) =>
    state.stats.derivedStats;


    export const selectBonds= (state: RootState) => state.stats.bonds