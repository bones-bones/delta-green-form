import React from 'react';
import styled from '@emotion/styled';
import { StatRow } from './StatRow';

export const StatTable = () => {

    return <Container>
        <Table>
            <tr>
                <th>8. STATISTICS</th><th>SCORE</th><th>x5</th><th>DISTINGUISHING FEATURES</th>
            </tr>
            {['Strength',
                'Constitution',
                'Dexterity',
                'Intelligence',
                'Power',
                'Charisma'].map(entry => (<StatRow key={entry} stat={entry} />))}
        </Table>

        <Table>
            <tr>
                <th>9. DERIVED ATTRIBUTES</th><th>MAXIMUM</th><th>CURRENT</th>
            </tr>
            <tr>
                <td>Hit Points (HP)</td><td></td><td></td>
            </tr>
            <tr>
                <td>Willpower Points (WP)</td><td></td><td></td>
            </tr>
            <tr>
                <td>Sanity Points (SAN)</td><td></td><td></td>
            </tr>
            <tr>
                <td>Breaking Point (BP)</td><td></td><td></td>
            </tr>

        </Table>
    </Container>
}

const Container = styled.div({

});
const Table = styled.table({
    fontSize: '14px'
});