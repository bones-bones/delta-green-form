import styled from '@emotion/styled';

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddRowButton, SectionHeader } from '../components';
import { actions } from './reducer';
import { selectBonds } from './selectors';
import { Bond } from './types';

export const BondsFrame = () => {
    const skills = useSelector(selectBonds);
    const dispatch = useDispatch();
    const [newBond, setNewBond] = useState<Partial<Bond> | undefined>(
        undefined
    );

    const save = () => {
        if (newBond && isValidBond(newBond)) {
            dispatch(actions.addBond(newBond as Bond));
            setNewBond(undefined);
        }
    };

    return (
        <>
            <SectionHeader>Bonds</SectionHeader>
            <Table>
                <HeaderRow>
                    <TableHeadItem>Name</TableHeadItem>
                    <TableHeadItem>Relationship Desc.</TableHeadItem>
                    <TableHeadItem>Value</TableHeadItem>
                </HeaderRow>
                {Object.values(skills).map((entry) => {
                    return (
                        <Entry key={entry.name}>
                            <Cell>
                                <Name
                                    stillInContact={entry.value > 0}
                                    value={entry.name}
                                    onChange={({ target: { value } }) => {
                                        dispatch(
                                            actions.modifyBond({
                                                ...entry,
                                                name: value,
                                            })
                                        );
                                    }}
                                />
                            </Cell>
                            <Cell>
                                <Description
                                    value={entry.notes}
                                    onChange={({ target: { value } }) => {
                                        dispatch(
                                            actions.modifyBond({
                                                ...entry,
                                                notes: value,
                                            })
                                        );
                                    }}
                                ></Description>
                            </Cell>
                            <Cell>
                                <NumberValue
                                    type="number"
                                    value={entry.value}
                                    onChange={({ target: { value } }) => {
                                        dispatch(
                                            actions.modifyBond({
                                                ...entry,
                                                value: parseInt(value || '0'),
                                            })
                                        );
                                    }}
                                />
                            </Cell>
                        </Entry>
                    );
                })}
                {newBond && (
                    <Entry key={'blank'}>
                        <Cell>
                            <Name
                                stillInContact={true}
                                onBlur={save}
                                onChange={({ target: { value } }) => {
                                    setNewBond({ ...newBond, name: value });
                                }}
                                value={newBond.name}
                            />
                        </Cell>
                        <Cell>
                            <Description
                                onBlur={save}
                                onChange={({ target: { value } }) => {
                                    setNewBond({ ...newBond, notes: value });
                                }}
                                value={newBond.notes}
                            />
                        </Cell>
                        <Cell>
                            <NumberValue
                                type="number"
                                onBlur={save}
                                onChange={({ target: { value } }) => {
                                    setNewBond({
                                        ...newBond,
                                        value:
                                            value != undefined
                                                ? parseInt(value || '0')
                                                : value,
                                    });
                                }}
                                value={newBond.value}
                            />
                        </Cell>
                    </Entry>
                )}
            </Table>
            <AddRowButton onClick={() => setNewBond({})} />
        </>
    );
};

const isValidBond = (bond: Partial<Bond>) => {
    return bond.name && bond.value;
};

const NumberValue = styled.input((value) => {
    return {
        backgroundColor: 'green',
        boxSizing: 'border-box',
        ':valid': {
            backgroundColor: '#002200',
        },

        ...(!value.value ? { border: '1px solid white' } : { border: 'none' }),
        color: 'white',
        fontSize: '16px',

        borderRadius: '5px',
        textAlign: 'center',
        fontWeight: 'bold',
        width: '30px',
    };
});

const Description = styled.textarea((val) => {
    return {
        boxSizing: 'border-box',
        backgroundColor: '#002200',
        ':focus': {
            backgroundColor: 'green',

            overflow: 'auto',
        },
        color: 'white',
        fontSize: '16px',
        ...(!val.value ? { border: '1px solid white' } : { border: 'none' }),
        borderRadius: '5px',
        textAlign: 'center',
        width: '150px',
        overflow: 'hidden',
    };
});

const Table = styled.table({
    color: 'white',

    width: '100%',
});

const Name = styled.input(
    ({
        stillInContact,
        value,
    }: {
        stillInContact: boolean;
        value?: string;
    }) => ({
        ...(!stillInContact && { textDecoration: 'line-through' }),
        fontWeight: 'bold',
        boxSizing: 'border-box',
        backgroundColor: '#002200',
        ...(!value ? { border: '1px solid white' } : { border: 'none' }),
        display: 'flex',
        alignItems: 'center',
        color: 'white',
        fontSize: '16px',

        borderRadius: '5px',
        textAlign: 'center',
        ':focus': {
            backgroundColor: 'green',
            border: '1px solid green',
            overflow: 'auto',
        },
    })
);

const Entry = styled.tr({
    border: '1px solid green',
    backgroundColor: '#002200',
    height: '30px',
});

const TableHeadItem = styled.th({ textAlign: 'left' });

const Cell = styled.td({ borderTop: '1px solid white' });

const HeaderRow = styled.tr({ height: '15px' });
