import React, { createContext, useMemo, useState } from 'react';

export const DataChannelContext = createContext({
    dataChannel: undefined,
    setDataChannel: () => {
        //
    },
} as {
    dataChannel?: RTCDataChannel;
    setDataChannel: (channel: RTCDataChannel) => void;
});

export const DataChannelWrapperProvider = ({
    children,
}: {
    children?: React.ReactNode;
}) => {
    const [dataChannel, setDataChannel] = useState<RTCDataChannel>();
    const value = useMemo(
        () => ({ dataChannel, setDataChannel }),
        [dataChannel]
    );

    return (
        <DataChannelContext.Provider value={value}>
            {children}
        </DataChannelContext.Provider>
    );
};
