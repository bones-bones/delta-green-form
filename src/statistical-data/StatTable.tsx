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


    </Container>
}

const Container = styled.div({

});
const Table = styled.div({
    fontSize: '14px'
});