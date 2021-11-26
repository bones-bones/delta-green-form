import styled from '@emotion/styled';

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectBonds } from '../stats/selectors';
import { NumericInput } from './numeric-input';

export const BondsFrame = () => {
    const bonds = useSelector(selectBonds);
    const [localBonds, setLocalBonds] = useState(bonds);

    return (
        <>
            <Header>Bonds</Header>
            <Table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>History</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    {localBonds.map((entry) => {
                        return (
                            <tr key={entry.name}>
                                <td><input type="text" defaultValue={entry.name}/></td>
                                <td><input type="text" defaultValue={entry.name}/></td>
                                <td><NumericInput type="text" defaultValue={entry.score}/></td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
            <button onClick={()=>{setLocalBonds(localBonds.concat({name:'',score:0,history:''}))}}>Add Bond</button>
        </>
    );
};

const Table = styled.table({ color: 'white' });
const Header = styled.h2({ color: 'white' });
