import styled from '@emotion/styled';

import React from 'react';
import { useSelector } from 'react-redux';
import { SectionHeader } from '../components';
import { getPoints } from '../points';

export const DerivedFrame = () => {
    const derivedAttributes = useSelector(getPoints);
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
                            {derivedAttributes.sp.current}/
                            {derivedAttributes.sp.max}
                        </td>
                    </tr>
                    <tr>
                        <td>Breaking Point</td>
                        <td>{derivedAttributes.bp}</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    );
};

const Table = styled.table({ color: 'white' });
