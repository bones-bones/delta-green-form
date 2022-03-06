import { createRTCPeerConnection } from './createPeerConnection';

export const createGuest = async (offerDesc: RTCSessionDescriptionInit) =>
    new Promise<RTCPeerConnection>(async (resolve) => {
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
                                await peerConn.createAnswer()
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
            console.log('cand');
            if (e.candidate === null) {
                navigator.clipboard.writeText(
                    JSON.stringify(peerConn.localDescription)
                );
            }
        };

        await peerConn.setRemoteDescription(
            new RTCSessionDescription(offerDesc)
        );
        const answer = await peerConn.createAnswer();
        await peerConn.setLocalDescription(answer);

        resolve(peerConn);
    });
