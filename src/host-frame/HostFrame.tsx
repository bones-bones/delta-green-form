// import styled from '@emotion/styled';

import React, { useEffect, useState } from 'react';
import { createGuest } from '../rtc';
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
                    createGuest(
                        JSON.parse(
                            (await navigator.clipboard.readText()).replaceAll(
                                '\\\\',
                                '\\'
                            )
                        )
                    ).then((e) => {
                        setConnection(e);
                        console.log(e, 'connection');
                    });
                }}
            >
                Join
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
