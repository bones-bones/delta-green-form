import styled from '@emotion/styled';

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectBonds } from '../stats/selectors';
import { BondRow, PartialBond } from './BondRow';

export const BondsFrame = () => {
    const bonds = useSelector(selectBonds);
    const [localBonds, setLocalBonds] = useState<PartialBond[]>(bonds);

    return (
        <>
            <Header>Bonds</Header>
            <Table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>History</th>
                        <th>Score</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {localBonds.map((entry, index) => (
                        <BondRow
                            name={entry.name}
                            score={entry.score}
                            history={entry.history}
                            key={index}
                            onChange={(updatedBond) => {
                                setLocalBonds(
                                    localBonds.map((entryBond, ii) => 
                                         ii == index
                                            ? updatedBond
                                            : entryBond
                                    )
                                );
                            }}
                            onRemove={() =>
                                setLocalBonds(
                                    localBonds.filter((_e, ii) => ii !== index)
                                )
                            }
                        />
                    ))}
                </tbody>
            </Table>
            <button
                onClick={() => {
                    setLocalBonds(
                        localBonds.concat({
                            name: '',
                            score: 0,
                            history: '',
                        })
                    );
                }}
            >
                Add Bond
            </button>
        </>
    );
};

const Table = styled.table({ color: 'white' });
const Header = styled.h2({ color: 'white' });
