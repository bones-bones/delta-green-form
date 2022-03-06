import styled from '@emotion/styled';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { beginProjection } from '../rtc';
import { actions } from './reducer';
import { selectNotifications } from './selectors';

export const Notifications = () => {
    const noteList = useSelector(selectNotifications).filter(
        ({ seen }) => !seen
    );
    const dispatch = useDispatch();
    const [connection, setConnection] = useState<RTCPeerConnection>();
    const [localDataChannel, setDataChannel] = useState<RTCDataChannel>();

    useEffect(() => {
        if (localDataChannel) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const dataChannelMessageRef = localDataChannel.onmessage!; // doing this because of the connection handling built into the beginProjection logic

            localDataChannel.onmessage = (message) => {
                console.log('monkey patch'); // todo don't do this too many times
                const resp = JSON.parse(message.data);
                dispatch(
                    actions.addMessage({
                        message: resp.message,
                        title: resp.title,
                    })
                );

                dataChannelMessageRef.apply(localDataChannel, [message]);
            };
        }
    }, [localDataChannel]);

    return (
        <Container>
            <button
                onClick={async () => {
                    const { dataChannel, peerConnection } =
                        await beginProjection();
                    setConnection(peerConnection);
                    setDataChannel(dataChannel);
                }}
            >
                test
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
                second button
            </button>
            {noteList.map((e, index) => (
                <Note
                    key={index}
                    onClick={() => {
                        dispatch(actions.markAsRead(e.id));
                    }}
                >
                    {e.message}
                </Note>
            ))}
        </Container>
    );
};

const Container = styled.div({
    position: 'fixed',
    top: '10px',
    right: '10px',
    width: '300px',
    zIndex: 5,
});
const Note = styled.div({
    backgroundColor: 'green',
    border: '2px solid white',
    marginTop: '10px',
});