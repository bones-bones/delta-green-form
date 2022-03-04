// See also: https://blog.mozilla.org/webrtc/perfect-negotiation-in-webrtc/

import { createRTCPeerConnection } from './createPeerConnection';

export const createHost = async () =>
    new Promise<RTCPeerConnection>((resolve) => {
        const peerConn = createRTCPeerConnection();

        const dataChannel = peerConn.createDataChannel('projecting');

        dataChannel.onmessage = async (message: any) => {
            console.log(message);
            const parsedMessage =
                typeof message.data === 'string' && message.data.startsWith('{')
                    ? JSON.parse(message.data)
                    : message.data;
            const { description, candidate } = parsedMessage;
            if (description) {
                await peerConn.setRemoteDescription(description);
                if (description.type === 'offer') {
                    await peerConn.setLocalDescription(
                        await peerConn.createAnswer({
                            // offerToReceiveVideo: true,
                        })
                    );
                    dataChannel.send(
                        JSON.stringify({
                            description: peerConn.localDescription,
                        })
                    );
                }
            } else if (candidate) {
                console.log('CANDIDATEO');
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
            peerConn.setLocalDescription(desc).then(() => {
                resolve(peerConn);
            });
        });
    });

export const createGuest = async (offerDesc: RTCSessionDescriptionInit) =>
    new Promise<RTCPeerConnection>((resolve) => {
        const peerConn = createRTCPeerConnection();
        peerConn.ondatachannel = ({ channel }) => {
            console.log('Channel Request');
            channel.onopen = () => {
                channel.onmessage = async (ent) => {
                    console.log('message', ent);
                    const parsedMessage =
                        typeof ent.data === 'string' && ent.data.startsWith('{')
                            ? JSON.parse(ent.data)
                            : ent.data;
                    const { description, candidate } = parsedMessage;

                    if (description) {
                        await peerConn.setRemoteDescription(description);

                        if (description.type === 'offer') {
                            await peerConn.setLocalDescription(
                                await peerConn.createAnswer({
                                    //    offerToReceiveVideo: true,
                                })
                            );
                            channel.send(
                                JSON.stringify({
                                    description: peerConn.localDescription,
                                })
                            );
                        }
                    } else if (candidate) {
                        await peerConn.addIceCandidate(candidate);
                    }
                };
            };
        };
        peerConn.onicecandidate = (e) => {
            if (e.candidate === null) {
                navigator.clipboard.writeText(
                    JSON.stringify(peerConn.localDescription)
                );
            }
        };
        peerConn.setRemoteDescription(new RTCSessionDescription(offerDesc));

        peerConn
            .createAnswer({
                //  offerToReceiveVideo: true
            })
            .then((desc) => {
                peerConn.setLocalDescription(desc).then(() => {
                    resolve(peerConn);
                });
            });
    });

export function beginProjection() {
    return new Promise<RTCPeerConnection>((resolve) => {
        const broadcastChannel = new BroadcastChannel('projectionChannel');
        createHost().then((test) => {
            console.log(test, JSON.stringify(test.localDescription));

            broadcastChannel.onmessage = function async(ev) {
                console.log(ev);

                test.setRemoteDescription(JSON.parse(ev.data)).then(() => {
                    resolve(test);
                });
            };
            broadcastChannel.postMessage('!');
        });
    });
}
