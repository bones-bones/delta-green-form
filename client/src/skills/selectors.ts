import { RootState } from '../store';

export const selectSkills = (state: RootState) => state.skills.skills;

export const selectPointsToAllocate = (state: RootState) =>
    state.skills.pointsToAllocate;
