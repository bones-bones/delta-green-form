import React, { useState } from 'react';
import { PlayerViewComponent } from './PlayerViewComponent';
import { PlayerDefinition } from './types';

interface Props {
    channel: RTCDataChannel;
    connection: RTCPeerConnection;
}

export const PlayerView = (props: Props) => {
    const [playerData, setPlayerData] = useState<PlayerDefinition>();

    props.channel.onmessage = ({ data }) => {
        setPlayerData(JSON.parse(data));
    };

    return <>{playerData && <PlayerViewComponent data={playerData} />}</>;
};

/**
 * name
 * info
 * stats
 * bonds
 * inventory
 */
