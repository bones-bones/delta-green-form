// See also: https://blog.mozilla.org/webrtc/perfect-negotiation-in-webrtc/

import { createRTCPeerConnection } from './createPeerConnection';

export const createHost = async () =>
    new Promise<{
        peerConnection: RTCPeerConnection;
        dataChannel: RTCDataChannel;
    }>((resolve) => {
        const peerConn = createRTCPeerConnection();
        const dataChannel = peerConn.createDataChannel('projecting');

        dataChannel.onopen = () => {
            console.log('open');
            dataChannel.send('this is from the host');
        };

        dataChannel.onmessage = async ({ data }: any) => {
            console.log('!!', data);
            const parsedMessage =
                typeof data === 'string' && data.startsWith('{')
                    ? JSON.parse(data)
                    : data;
            const { description, candidate } = parsedMessage;
            if (description) {
                await peerConn.setRemoteDescription(description);
                if (description.type === 'offer') {
                    await peerConn.setLocalDescription(
                        await peerConn.createAnswer()
                    );
                    dataChannel.send(
                        JSON.stringify({
                            description: peerConn.localDescription,
                        })
                    );
                }
            } else if (candidate) {
                await peerConn.addIceCandidate(candidate);
            }
        };

        peerConn.onicecandidate = ({ candidate }) => {
            console.log('ice candidate');

            if (candidate === null) {
                if (dataChannel?.readyState === 'open') {
                    dataChannel.send(JSON.stringify({ candidate }));
                }
                peerConn.onnegotiationneeded = async () => {
                    console.log('there is a need to negotiate');

                    await peerConn.setLocalDescription(
                        await peerConn.createOffer()
                    );
                    dataChannel.send(
                        JSON.stringify({
                            description: peerConn.localDescription,
                        })
                    );
                };
            }
        };

        peerConn.createOffer().then((desc) => {
            peerConn
                .setLocalDescription(desc)
                .then(() => resolve({ peerConnection: peerConn, dataChannel }));
        });
    });
