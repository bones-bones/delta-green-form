import styled from '@emotion/styled';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createGuest } from '../rtc';
import { actions } from './reducer';
import { selectNotifications } from './selectors';

export const Notifications = () => {
    const dispatch = useDispatch();
    const noteList = useSelector(selectNotifications).filter(
        ({ seen }) => !seen
    );

    const [connection, setConnection] = useState<RTCPeerConnection>();
    const [localDataChannel, setDataChannel] = useState<RTCDataChannel>();

    useEffect(() => {
        if (localDataChannel) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const dataChannelMessageRef = localDataChannel.onmessage!; // doing this because of the connection handling built into the beginProjection logic

            localDataChannel.onmessage = (channelMessage) => {
                console.log('monkey patch', channelMessage); // todo don't do this too many times
                try {
                    const { message, title } = JSON.parse(channelMessage.data);

                    dispatch(
                        actions.addMessage({
                            message,
                            title,
                        })
                    );

                    dataChannelMessageRef.apply(localDataChannel, [message]);
                } catch {
                    console.log('errored');
                }
            };
        }
    }, [localDataChannel]);

    return (
        <Container>
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
                        e.ondatachannel = ({ channel }) => {
                            console.log('on data channel', channel);
                            setDataChannel(channel);
                        };
                        console.log(e, 'connection');
                    });
                }}
            >
                Join
            </button>

            {noteList.map((e, index) => (
                <Note key={index}>
                    {e.message}{' '}
                    <CloseButton
                        onClick={() => {
                            dispatch(actions.markAsRead(e.id));
                        }}
                    >
                        X
                    </CloseButton>
                </Note>
            ))}
        </Container>
    );
};
const CloseButton = styled.button();

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
    display: 'flex',
    justifyContent: 'space-between',
});
