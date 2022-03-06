import { createHost } from './createHost';

export const beginProjection = () => {
    return new Promise<{
        dataChannel: RTCDataChannel;
        peerConnection: RTCPeerConnection;
    }>((resolve) => {
        createHost().then(({ dataChannel, peerConnection }) => {
            console.log(
                peerConnection,
                JSON.stringify(peerConnection.localDescription)
            );
            navigator.clipboard.writeText(
                JSON.stringify(peerConnection.localDescription)
            );
            resolve({ dataChannel, peerConnection });
        });
    });
};
