import { createHost } from './createHost';

export const beginProjection = () => {
    return new Promise<{
        dataChannel: RTCDataChannel;
        peerConnection: RTCPeerConnection;
        offer: RTCSessionDescription;
    }>((resolve) => {
        createHost().then(({ dataChannel, peerConnection }) => {
            resolve({
                dataChannel,
                peerConnection,
                offer: peerConnection.localDescription!,
            });
        });
    });
};
