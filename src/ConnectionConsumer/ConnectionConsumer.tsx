// import styled from '@emotion/styled';

import React, { useEffect, useState } from 'react';
import { createGuest } from '../rtc';
export const ConnectionConsumer = () => {
    const [connectionInfo, setConnectionInfo] =
        useState<RTCSessionDescriptionInit>();
    const [connection, setConnection] = useState<RTCPeerConnection>();
    const [dataChannel, setDataChannel] = useState<RTCDataChannel>();

    useEffect(() => {
        console.log('going to connect', connectionInfo);
        if (connectionInfo) {
            createGuest(connectionInfo).then((e) => {
                setConnection(e);
                console.log(e, 'connection');
            });
        }
    }, [connectionInfo]);

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
            Enter code
            <button
                onClick={async () => {
                    setConnectionInfo(
                        JSON.parse(
                            (await navigator.clipboard.readText()).replaceAll(
                                '\\\\',
                                '\\'
                            )
                        )
                    );
                }}
            >
                register
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
