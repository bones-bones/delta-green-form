import React from 'react';
import styled from '@emotion/styled';

export const StatRow = ({ stat, value }: { stat: string, value?: number }) => {

    return <tr>
        <td>{`${stat} (${stat.substr(0, 3).toUpperCase()})`}</td><td><input type="text" value={value} /></td><td><span>{value ? value * 5 : ''}</span></td><td></td>
    </tr>




}

const Container = styled.div({

});

// 3-4 5-8 9-12 13-16 17-18
// ['Feeble', 'Weak', 'Muscular', 'Huge']
// ['Bare mobile', 'Clumsy', 'Nimble', 'Acrobatic']
// ['Bedridden', 'Sickly', 'Perfect health', 'Indefatigable']
// ['Imbecilic', 'Slow', 'Perceptive', 'Brilliant']
// ['Spineless', 'Nervous', 'Strong-willed', 'Indomitable']
// ['Unbearable', 'Awkward', 'Chraming', 'Magnetic']