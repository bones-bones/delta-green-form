import styled from '@emotion/styled';

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectDerivedStats } from '../stats';

export const DerivedFrame = () => {
    const derivedAttributes = useSelector(selectDerivedStats);

    return (
        <Table>
            <thead>
                <tr>
                    <th>Derived Attributes</th>
                    <th>Values</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Hit Points</td>
                    <td>
                        {derivedAttributes.hp.current}/
                        {derivedAttributes.hp.max}
                    </td>
                </tr>
                <tr>
                    <td>Willpower Points</td>
                    <td>
                        {derivedAttributes.wp.current}/
                        {derivedAttributes.wp.max}
                    </td>
                </tr>
                <tr>
                    <td>Sanity Points</td>
                    <td>
                        {derivedAttributes.sanity.current}/
                        {derivedAttributes.sanity.max}
                    </td>
                </tr>
                <tr>
                    <td>Breaking Point</td>
                    <td>{derivedAttributes.breakingPoint.max}</td>
                </tr>
            </tbody>
        </Table>
    );
};

const Table = styled.table({ color: 'white' });
