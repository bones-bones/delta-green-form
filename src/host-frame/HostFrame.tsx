// import styled from '@emotion/styled';

import React, { useEffect, useState } from 'react';
import { beginProjection } from '../rtc';
export const HostFrame = () => {
    const [connection, setConnection] = useState<RTCPeerConnection>();
    const [dataChannel, setDataChannel] = useState<RTCDataChannel>();

    useEffect(() => {
        if (connection) {
            const monkeyOnDataChannel = connection.ondatachannel;

            connection.ondatachannel = (args) => {
                setDataChannel(args.channel);
                monkeyOnDataChannel?.apply(connection, [args]);
            };
        }
    }, [connection]);

    return (
        <>
            <button
                onClick={async () => {
                    const { dataChannel, peerConnection } =
                        await beginProjection();
                    setConnection(peerConnection);
                    setDataChannel(dataChannel);
                }}
            >
                Host
            </button>
            <button
                onClick={async () => {
                    const resp = JSON.parse(
                        (await navigator.clipboard.readText()).replaceAll(
                            '\\\\',
                            '\\'
                        )
                    );
                    connection?.setRemoteDescription(resp);
                }}
            >
                Accept guest
            </button>
            {connection && (
                <input
                    onChange={({ target: { value } }) => {
                        if (dataChannel) {
                            dataChannel.send(
                                JSON.stringify({
                                    title: 'title',
                                    message: value,
                                })
                            );
                        }
                    }}
                />
            )}
        </>
    );
};
