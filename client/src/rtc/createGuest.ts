import { addGuestOffer, getSessionData } from '../host-frame/connection';
import { createRTCPeerConnection } from './createPeerConnection';

export const createGuest = async (sessionId: string) => {
    const peerConn = createRTCPeerConnection();
    peerConn.ondatachannel = ({ channel }) => {
        console.log('Channel Request');
        channel.onopen = () => {
            channel.onmessage = async ({ data }) => {
                console.log('message', data);
                const parsedMessage =
                    typeof data === 'string' && data.startsWith('{')
                        ? JSON.parse(data)
                        : data;
                if (parsedMessage) {
                    console.log('received a request to renegotiate');
                    const { description, candidate } = parsedMessage;

                    if (description) {
                        await peerConn.setRemoteDescription(description);

                        if (description.type === 'offer') {
                            const answer = await peerConn.createAnswer();
                            await peerConn.setLocalDescription(answer);
                            channel.send(
                                JSON.stringify({
                                    description: peerConn.localDescription,
                                })
                            );
                        }
                    } else if (candidate) {
                        await peerConn.addIceCandidate(candidate);
                    }
                }
            };
        };
    };
    peerConn.onicecandidate = (e) => {
        console.log('cand');
        if (e.candidate === null) {
            // navigator.clipboard.writeText(
            //     JSON.stringify(peerConn.localDescription)
            // );
            addGuestOffer({
                offer: JSON.stringify(peerConn.localDescription),
                sessionId,
            });
        }
    };

    const offerDesc = JSON.parse((await getSessionData(sessionId)).hostInfo!);

    await peerConn.setRemoteDescription(new RTCSessionDescription(offerDesc));
    const answer = await peerConn.createAnswer();
    await peerConn.setLocalDescription(answer);

    return peerConn;
};
