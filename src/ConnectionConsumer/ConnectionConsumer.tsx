import styled from '@emotion/styled';

import React, { useEffect, useState } from 'react';
import { createGuest } from '../rtc/rtc';
export const ConnectionConsumer = () => {
    const [connectionInfo, setConnectionInfo] =
        useState<RTCSessionDescriptionInit>();
    const [connection, setConnection] = useState<RTCPeerConnection>();

    useEffect(() => {
        console.log('going to connect', connectionInfo);
        if (connectionInfo) {
            createGuest(connectionInfo).then((e) => {
                setConnection(e);
                console.log(e, 'connection');
            });
        }
    }, [connectionInfo]);

    return (
        <>
            Enter code
            <input
                type="text"
                onChange={({ target: { value } }) => {
                    setConnectionInfo(
                        JSON.parse(value.replaceAll('\\\\', '\\'))
                    );
                }}
            />
            {connection && (
                <input
                    onChange={() => {
                        connection.createDataChannel('ee').send('here');
                    }}
                />
            )}
        </>
    );
};
