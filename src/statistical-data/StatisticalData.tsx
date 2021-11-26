import React from 'react';
import styled from '@emotion/styled';
import { StatTable } from './StatTable';

export const StatisticalData = () => {

    return <OuterBox>
        <StatTable />
        </OuterBox>
}

const OuterBox = styled.div({
    gridColumn: 1,
    gridRow: 3,
    backgroundColor: 'eggshell'
});