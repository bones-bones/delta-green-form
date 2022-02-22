import { RootState } from '../store';

export const selectStats = (state: RootState) => state.stats.stats;

export const selectBonds = (state: RootState) => state.stats.bonds;
