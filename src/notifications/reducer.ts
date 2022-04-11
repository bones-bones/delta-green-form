import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NotificationData {
    message: string;
    title: string;
}

interface NotificationMetadata {
    seen?: boolean;
    id: string;
}

type Notification = NotificationData & NotificationMetadata;

const initialState: Notification[] = [];

export const { actions, reducer } = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        addMessage: (state, { payload }: PayloadAction<NotificationData>) => {
            state.push({ ...payload, id: (crypto as any).randomUUID() });
        },
        markAsRead: (
            state,
            { payload }: PayloadAction<NotificationMetadata['id']>
        ) => {
            const entryToUpdate = state.find(({ id }) => id === payload);

            if (entryToUpdate) {
                entryToUpdate.seen = true;
            }
        },
    },
});
