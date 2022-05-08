import React, { useEffect, useState } from 'react';
import { beginProjection } from '../../rtc';
import { addHostOffer, createSession, pollForGuest } from './remoteSession';

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
                    const sessionId = await createSession();

                    const { dataChannel, peerConnection, offer } =
                        await beginProjection();
                    await addHostOffer({
                        sessionId,
                        offer: JSON.stringify(offer),
                    });
                    setConnection(peerConnection);
                    setDataChannel(dataChannel);

                    const resp = JSON.parse(await pollForGuest(sessionId));

                    await peerConnection.setRemoteDescription(resp);
                    if (dataChannel) {
                        registerConnection({
                            connection: peerConnection,
                            channel: dataChannel,
                            name,
                        });
                    }
                }}
            >
                Create Offer
            </button>

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
