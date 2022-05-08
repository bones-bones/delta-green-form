import { useDispatch } from 'react-redux';
import { createGuest } from '../rtc';
import { actions as networkActions } from '../rtc/reducer';

export const useRTCHost = () => {
    //

    return {};
};

export const useRTCGuest = (sessionId?: string) => {
    console.log(sessionId, '!!!');
    const dispatch = useDispatch();
    if (sessionId) {
        createGuest(sessionId).then((connection) => {
            const existingOnDataChannel = connection.ondatachannel;
            connection.ondatachannel = (channelEvent) => {
                dispatch(networkActions.setChannel(channelEvent.channel));
                existingOnDataChannel?.apply(connection, [channelEvent]);
            };
        });
    }
};
