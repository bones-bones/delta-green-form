import React, { useEffect, useState } from 'react';
import { beginProjection } from '../../rtc';

interface Props {
    registerConnection: ({
        connection,
        channel,
        name,
    }: {
        connection: RTCPeerConnection;
        channel: RTCDataChannel;
        name: string;
    }) => void;
}

export const Connection = ({ registerConnection }: Props) => {
    const [connection, setConnection] = useState<RTCPeerConnection>();
    const [dataChannel, setDataChannel] = useState<RTCDataChannel>();
    const [name, setName] = useState<string>('');

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
                Create Offer
            </button>
            {connection && (
                <button
                    onClick={async () => {
                        const resp = JSON.parse(
                            (await navigator.clipboard.readText()).replaceAll(
                                '\\\\',
                                '\\'
                            )
                        );
                        await connection.setRemoteDescription(resp);
                        if (dataChannel) {
                            registerConnection({
                                connection,
                                channel: dataChannel,
                                name,
                            });
                        }
                    }}
                >
                    Accept Response
                </button>
            )}
            <label htmlFor="name">Player name</label>
            <input
                id="name"
                type="text"
                onBlur={({ target: { value } }) => {
                    setName(value);
                }}
            />
        </>
    );
};

Connection.displayName = 'Connection';
