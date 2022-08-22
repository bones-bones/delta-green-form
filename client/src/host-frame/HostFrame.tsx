import styled from '@emotion/styled';

import React, { useContext, useState } from 'react';
import { Connection } from './connection';
import { DataChannelContext } from './DataChannelContext';
import { PlayerView } from './PlayerView';

export const HostFrame = () => {
    const [registrations, setRegistrations] = useState<
        Record<
            string,
            {
                channel: RTCDataChannel;
                connection: RTCPeerConnection;
            }
        >
    >({});
    const [showRow, setShowRow] = useState<boolean>(true);
    const { setDataChannel, dataChannel } = useContext(DataChannelContext);

    console.log(dataChannel, 'çççÇÇ˜Í');
    return (
        <>
            <label htmlFor="sendAll">Send Message to All</label>

            <input
                id="sendAll"
                onBlur={({ target: { value } }) => {
                    Object.values(registrations).forEach(({ channel }) => {
                        if (channel) {
                            channel.send(
                                JSON.stringify({
                                    title: 'title',
                                    message: value,
                                })
                            );
                        }
                    });
                }}
            />
            <ConnectionsTable>
                {Object.entries(registrations).map(([name, object]) => {
                    return (
                        <div key={name}>
                            {name}
                            <PlayerView
                                channel={object.channel}
                                connection={object.connection}
                            />
                        </div>
                    );
                })}
            </ConnectionsTable>
            {showRow && (
                <Connection
                    registerConnection={({ name, channel, connection }) => {
                        setDataChannel(channel);
                        setRegistrations({
                            [name]: { channel, connection },
                            ...registrations,
                        });
                        setShowRow(false);
                    }}
                />
            )}
            <br></br>

            <button onClick={() => setShowRow(true)}>add player</button>
            <br></br>
        </>
    );
};

const ConnectionsTable = styled.div();
