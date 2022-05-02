import styled from '@emotion/styled';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRTCGuest } from '../host-frame/useRTC';
import { getDataChannel } from '../rtc/selectors';
import { actions } from './reducer';
import { selectNotifications } from './selectors';

export const Notifications = () => {
    const dispatch = useDispatch();
    const noteList = useSelector(selectNotifications).filter(
        ({ seen }) => !seen
    );

    const [hostDescription, setHostDescrption] =
        useState<RTCSessionDescriptionInit>();
    useRTCGuest(hostDescription);
    const dataChannel = useSelector(getDataChannel);

    useEffect(() => {
        if (dataChannel) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const dataChannelMessageRef = dataChannel.onmessage!; // doing this because of the connection handling built into the beginProjection logic

            dataChannel.onmessage = (channelMessage) => {
                console.log('monkey patch', channelMessage); // todo don't do this too many times
                try {
                    const { message, title } = JSON.parse(channelMessage.data);

                    dispatch(
                        actions.addMessage({
                            message,
                            title,
                        })
                    );

                    dataChannelMessageRef.apply(dataChannel, [message]);
                } catch {
                    console.log('errored');
                }
            };
        }
    }, [dataChannel]);

    return (
        <Container>
            <button
                onClick={async () => {
                    setHostDescrption(
                        JSON.parse(
                            (await navigator.clipboard.readText()).replaceAll(
                                '\\\\',
                                '\\'
                            )
                        )
                    );
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
