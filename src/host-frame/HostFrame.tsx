import styled from '@emotion/styled';

import React, { useEffect, useState } from 'react';
import { Connection } from './connection';
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

    return (
        <>
            <ConnectionsTable>
                {Object.entries(registrations).map(([name]) => {
                    return <div key={name}>{name}</div>;
                })}
            </ConnectionsTable>
            {showRow && (
                <Connection
                    registerConnection={({ name, channel, connection }) => {
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
            <label htmlFor="sendAll">Send Message to All</label>
            <input
                id="sendAll"
                onChange={({ target: { value } }) => {
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
        </>
    );
};

const ConnectionsTable = styled.div();
