import styled from '@emotion/styled';

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from './reducer';
import { selectInventory } from './selectors';
import { Item } from './types';

export const InventoryFrame = () => {
    const items = useSelector(selectInventory);
    const dispatch = useDispatch();
    const [newRow, setNewRow] = useState<Item | undefined>(undefined);

    const save = () => {
        if (newRow && isValidForSubmit(newRow)) {
            dispatch(actions.addItem(newRow));
            setNewRow(undefined);
        }
    };

    return (
        <ItemList>
            {Object.values(items).map((entry) => {
                return (
                    <Entry key={entry.name}>
                        <Name type="text" value={entry.name} />
                        <Description type="text" value={entry.description} />
                        <NumberValue
                            value={entry.count}
                            onChange={({ target: { value } }) => {
                                //dispatch();
                            }}
                        />
                    </Entry>
                );
            })}
            {newRow && (
                <Entry key={'blank'}>
                    <Name
                        onChange={({ target: { value } }) => {
                            //dispatch();
                            setNewRow({ ...newRow, name: value });
                        }}
                        onBlur={save}
                    ></Name>
                    <Description
                        type="text"
                        onChange={({ target: { value } }) => {
                            //dispatch();
                            setNewRow({ ...newRow, description: value });
                        }}
                        onBlur={save}
                    />
                    <NumberValue
                        onChange={({ target: { value } }) => {
                            if (value) {
                                setNewRow({
                                    ...newRow,
                                    count: parseInt(value || '0'),
                                });
                            }
                        }}
                        onBlur={save}
                    />
                </Entry>
            )}
            <AddRow
                onClick={() => {
                    setNewRow({ name: '', description: '' });
                }}
            >
                Add row
            </AddRow>
        </ItemList>
    );
};

const isValidForSubmit = (item: Item) => {
    return item.name && item.description;
};

const AddRow = styled.button();

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

const Description = styled.input({
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
    listStyleType: 'none',
    margin: 0,
    padding: 0,
});

const Entry = styled.li({
    display: 'flex',
    border: '1px solid green',
    backgroundColor: '#002200',
});

const Name = styled.input({
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
});
