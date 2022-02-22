import styled from '@emotion/styled';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from './reducer';
import { selectBonds } from './selectors';

export const BondsFrame = () => {
    const skills = useSelector(selectBonds);
    const dispatch = useDispatch();

    return (
        <Table>
            {Object.values(skills).map((entry) => {
                return (
                    <Entry key={entry.name}>
                        <Name stillInContact={entry.value !== 0}>
                            {entry.name}
                        </Name>
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
        </Table>
    );
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

const Name = styled.span(({ stillInContact }: { stillInContact: boolean }) => ({
    fontWeight: 'bold',
    display: 'flex',
    ...(!stillInContact && { textDecoration: 'line-through' }),
    alignItems: 'center',
}));
