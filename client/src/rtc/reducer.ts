import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: { channel?: RTCDataChannel } = {};

export const { actions, reducer } = createSlice({
    name: 'network',
    initialState,
    reducers: {
        setChannel: (state, { payload }: PayloadAction<RTCDataChannel>) => {
            return { channel: payload };
        },
    },
});
