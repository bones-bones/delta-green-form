import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type PersonData = {
    name?: string;
    profession?: string;
    background?: string;
};

const initialState: PersonData = {
    // name: 'Joe',
    // profession: 'Gas station attendant',
    // background: 'a regular guy\n very injured',
};

export const { actions, reducer } = createSlice({
    name: 'personData',
    initialState,
    reducers: {
        setData: (_state, { payload }: PayloadAction<PersonData>) => {
            return { ...payload };
        },
        addToBackground: (state, { payload }: PayloadAction<string>) => {
            return { ...state, background: state.background + '\n' + payload };
        },
    },
});
