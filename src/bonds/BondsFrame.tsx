import styled from '@emotion/styled';

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
        console.log(newBond);
        if (newBond && isValidBond(newBond)) {
            dispatch(actions.addBond(newBond as Bond));
            setNewBond(undefined);
        }
    };

    return (
        <Table>
            {Object.values(skills).map((entry) => {
                return (
                    <Entry key={entry.name}>
                        <Name
                            stillInContact={entry.value !== 0}
                            value={entry.name}
                        />
                        <Description>{entry.notes}</Description>
                        <NumberValue
                            value={entry.value}
                            onChange={({ target: { value } }) => {
                                dispatch(
                                    actions.modifyBond({
                                        name: entry.name,
                                        value: parseInt(value || '0'),
                                        notes: entry.notes,
                                    })
                                );
                            }}
                        />
                    </Entry>
                );
            })}
            {newBond && (
                <Entry key={'blank'}>
                    <Name
                        stillInContact={true}
                        onBlur={save}
                        onChange={({ target: { value } }) => {
                            setNewBond({ ...newBond, name: value });
                        }}
                    />
                    <Description
                        onBlur={save}
                        onChange={({ target: { value } }) => {
                            setNewBond({ ...newBond, notes: value });
                        }}
                    />
                    <NumberValue
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
                    />
                </Entry>
            )}
            <AddRow onClick={() => setNewBond({})}>Add Row</AddRow>
        </Table>
    );
};

const AddRow = styled.button();

const isValidBond = (bond: Partial<Bond>) => {
    return bond.name && bond.value;
};

const NumberValue = styled.input({
    backgroundColor: 'green',
    boxSizing: 'border-box',
    ':valid': {
        backgroundColor: 'transparent',
        border: '1px solid transparent',
    },
    color: 'white',
    fontSize: '16px',
    border: '1px solid green',
    borderRadius: '5px',
    textAlign: 'center',
    fontWeight: 'bold',
    width: '30px',
});

const Description = styled.textarea({
    boxSizing: 'border-box',
    backgroundColor: '#002200',
    ':focus': {
        backgroundColor: 'green',
        border: '1px solid green',
        overflow: 'auto',
    },
    color: 'white',
    fontSize: '16px',
    border: 'none',
    borderRadius: '5px',
    textAlign: 'center',
    width: '150px',
    overflow: 'hidden',
});

const Table = styled.div({
    color: 'white',
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    height: '200px',
    width: '100%',
});

const Entry = styled.div({
    display: 'flex',

    border: '1px solid green',
    backgroundColor: '#002200',
});

const Name = styled.input(
    ({ stillInContact }: { stillInContact: boolean }) => ({
        ...(!stillInContact && { textDecoration: 'line-through' }),
        fontWeight: 'bold',
        boxSizing: 'border-box',
        backgroundColor: '#002200',
        display: 'flex',
        alignItems: 'center',
        color: 'white',
        fontSize: '16px',
        border: 'none',
        borderRadius: '5px',
        textAlign: 'center',
        ':focus': {
            backgroundColor: 'green',
            border: '1px solid green',
            overflow: 'auto',
        },
    })
);
