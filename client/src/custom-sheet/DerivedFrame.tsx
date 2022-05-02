import styled from '@emotion/styled';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SectionHeader } from '../components';
import { actions, getPoints } from '../points';

export const DerivedFrame = () => {
    const { hp, sp, wp, bp } = useSelector(getPoints);
    const dispatch = useDispatch();

    const isUnset = hp.max == 0;

    return (
        <Container>
            <SectionHeader>Derived Attributes</SectionHeader>
            <Table>
                <thead>
                    <tr>
                        <th>Attributes</th>
                        <th>Values</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Hit Points</td>
                        <Cell>
                            <StatButton
                                disabled={isUnset}
                                onClick={() => {
                                    dispatch(actions.hpSet(hp.current - 1));
                                }}
                            >
                                -
                            </StatButton>
                            <NumberContainer>
                                {hp.current}/{hp.max}
                            </NumberContainer>
                            <StatButton
                                disabled={isUnset}
                                onClick={() => {
                                    dispatch(actions.hpSet(hp.current + 1));
                                }}
                            >
                                +
                            </StatButton>
                        </Cell>
                    </tr>
                    <tr>
                        <td>Willpower Points</td>
                        <Cell>
                            <StatButton
                                disabled={isUnset}
                                onClick={() => {
                                    dispatch(actions.spSet(wp.current - 1));
                                }}
                            >
                                -
                            </StatButton>
                            <NumberContainer>
                                {wp.current}/{wp.max}
                            </NumberContainer>
                            <StatButton
                                disabled={isUnset}
                                onClick={() => {
                                    dispatch(actions.wpSet(wp.current + 1));
                                }}
                            >
                                +
                            </StatButton>
                        </Cell>
                    </tr>
                    <tr>
                        <td>Sanity Points</td>
                        <Cell>
                            <StatButton
                                disabled={isUnset}
                                onClick={() => {
                                    dispatch(actions.spSet(sp.current - 1));
                                }}
                            >
                                -
                            </StatButton>
                            <NumberContainer>
                                {sp.current}/{sp.max}
                            </NumberContainer>
                            <StatButton
                                disabled={isUnset}
                                onClick={() => {
                                    dispatch(actions.spSet(sp.current + 1));
                                }}
                            >
                                +
                            </StatButton>
                        </Cell>
                    </tr>
                    <tr>
                        <td>Breaking Point</td>
                        <td>
                            <Cell>
                                <NumberContainer>{bp}</NumberContainer>
                            </Cell>
                        </td>
                    </tr>
                </tbody>
            </Table>
        </Container>
    );
};

const Table = styled.table({ color: 'white', fontSize: '20px' });

const NumberContainer = styled.div({});

const StatButton = styled.button({
    background: 'none',
    color: 'white',
    border: '1 px solid white',
    fontWeight: 'bold',
    fontSize: '20px',
});

const Cell = styled.td({ display: 'flex', justifyContent: 'space-between' });
const Container = styled.div({ flexGrow: 0.3 });
