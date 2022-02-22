import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { skillsSetup } from './constants';

type Skill = {
    value: number;
    failedInSession: boolean;
    name: string;
};

const initialState: Record<keyof typeof skillsSetup, Skill> = Object.keys(
    skillsSetup
).reduce((skillObject, skillKey) => {
    return {
        ...skillObject,
        [skillKey]: {
            name: skillKey,
            value: skillsSetup[skillKey as keyof typeof skillsSetup],
            failedInSession: false,
        },
    };
}, {} as Record<keyof typeof skillsSetup, Skill>);

export const { actions, reducer } = createSlice({
    name: 'skills',
    initialState,
    reducers: {
        loadInitial: (
            state,
            { payload }: PayloadAction<typeof initialState>
        ) => {
            return { ...state, ...payload };
        },
        toggleSkill: (
            state,
            { payload: skillId }: PayloadAction<keyof typeof skillsSetup>
        ) => {
            state[skillId].failedInSession = !state[skillId].failedInSession;
            return state;
        },
        setSkill: (
            state,
            {
                payload: { name, value },
            }: PayloadAction<{ name: keyof typeof skillsSetup; value: number }>
        ) => {
            state[name].value = value;
            return state;
        },
        completeScenario: (state) => {
            Object.values(state).forEach((skill: Skill) => {
                if (skill.failedInSession) {
                    skill.value += Math.floor(Math.random() * 4) + 1;
                    skill.failedInSession = false;
                }
            });
            return state;
        },
    },
});
