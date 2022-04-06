import { useDispatch } from 'react-redux';
import { createGuest } from '../rtc';
import { actions as networkActions } from '../rtc/reducer';

export const useRTCHost = () => {
    //

    return {};
};

export const useRTCGuest = (offerDesc?: RTCSessionDescriptionInit) => {
    const dispatch = useDispatch();
    if (offerDesc) {
        createGuest(offerDesc).then((connection) => {
            const existingOnDataChannel = connection.ondatachannel;
            connection.ondatachannel = (channelEvent) => {
                dispatch(networkActions.setChannel(channelEvent.channel));
                existingOnDataChannel?.apply(connection, [channelEvent]);
            };
        });
    }
};
