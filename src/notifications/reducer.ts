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

const initialState: Notification[] = [
    { message: '1st', title: '1aoesuth', id: '1' },
    { message: 'second', title: '1aoesuth', id: '2' },
    { message: 'Second', title: '1aoesuth', id: '3' },
];

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
