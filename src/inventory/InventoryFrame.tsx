import styled from '@emotion/styled';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from './reducer';
import { selectInventory } from './selectors';

export const InventoryFrame = () => {
    const items = useSelector(selectInventory);
    const dispatch = useDispatch();

    return (
        <ItemList>
            {Object.values(items).map((entry) => {
                return (
                    <Entry key={entry.name}>
                        <Name>{entry.name}</Name>
                        <Description>{entry.description}</Description>
                        <NumberValue
                            value={entry.count}
                            onChange={({ target: { value } }) => {
                                //dispatch();
                            }}
                        />
                    </Entry>
                );
            })}
        </ItemList>
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

const ItemList = styled.ul({
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

const Name = styled.span({
    fontWeight: 'bold',
    display: 'flex',
    textDecoration: 'line-through',
    alignItems: 'center',
});
