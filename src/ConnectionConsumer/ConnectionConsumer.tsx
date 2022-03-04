// import styled from '@emotion/styled';

import React, { useEffect, useState } from 'react';
import { createGuest } from '../rtc/rtc';
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

    if (connection) {
        connection.ondatachannel = ({ channel }) => {
            console.log('second data channel', channel);
            setDataChannel(channel);
        };
    }

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
                    onChange={() => {
                        if (dataChannel) {
                            dataChannel.send('!!');
                        }
                    }}
                />
            )}
        </>
    );
};
