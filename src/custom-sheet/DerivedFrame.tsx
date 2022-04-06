import styled from '@emotion/styled';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SectionHeader } from '../components';
import { actions, getPoints } from '../points';

export const DerivedFrame = () => {
    const derivedAttributes = useSelector(getPoints);
    const dispatch = useDispatch();

    return (
        <div>
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
                                onClick={() => {
                                    dispatch(
                                        actions.hpSet(
                                            derivedAttributes.hp.current - 1
                                        )
                                    );
                                }}
                            >
                                -
                            </StatButton>
                            <NumberContainer>
                                {derivedAttributes.hp.current}/
                                {derivedAttributes.hp.max}
                            </NumberContainer>
                            <StatButton
                                onClick={() => {
                                    dispatch(
                                        actions.hpSet(
                                            derivedAttributes.hp.current + 1
                                        )
                                    );
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
                                onClick={() => {
                                    dispatch(
                                        actions.spSet(
                                            derivedAttributes.sp.current - 1
                                        )
                                    );
                                }}
                            >
                                -
                            </StatButton>
                            <NumberContainer>
                                {derivedAttributes.wp.current}/
                                {derivedAttributes.wp.max}
                            </NumberContainer>
                            <StatButton
                                onClick={() => {
                                    dispatch(
                                        actions.wpSet(
                                            derivedAttributes.wp.current + 1
                                        )
                                    );
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
                                onClick={() => {
                                    dispatch(
                                        actions.spSet(
                                            derivedAttributes.sp.current - 1
                                        )
                                    );
                                }}
                            >
                                -
                            </StatButton>
                            <NumberContainer>
                                {derivedAttributes.sp.current}/
                                {derivedAttributes.sp.max}
                            </NumberContainer>
                            <StatButton
                                onClick={() => {
                                    dispatch(
                                        actions.spSet(
                                            derivedAttributes.sp.current + 1
                                        )
                                    );
                                }}
                            >
                                +
                            </StatButton>
                        </Cell>
                    </tr>
                    <tr>
                        <td>Breaking Point</td>
                        <td>
                            <NumberContainer>
                                {derivedAttributes.bp}
                            </NumberContainer>
                        </td>
                    </tr>
                </tbody>
            </Table>
        </div>
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

const Cell = styled.td({ display: 'flex' });
